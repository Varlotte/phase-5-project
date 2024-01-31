import { ensureLoggedIn } from 'connect-ensure-login';
import { parse } from 'date-fns';
import express from 'express';
import session from 'express-session';
import _ from 'lodash';
import ViteExpress from 'vite-express';
import type { NextFunction, Request, Response } from 'express';

import passport, { ensureCurrentUser, hashPassword } from './auth';
import db, { Prisma, validation } from './db';
import type { NewUser, UpdateUser, UserAuth } from './types';

// Initial setup:

const app = express();
// sets 3000 as default port but you can also pass in a specific one in an env variable
const port = process.env.PORT || 3000;
// parse json bodies
app.use(express.json());
// set up session support
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);
// set up passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    const id = (user as UserAuth).id;

    return cb(null, id);
  });
});
passport.deserializeUser((id: string, cb) => {
  process.nextTick(() => {
    return cb(null, id);
  });
});

// API routes:

// User login
app.post('/api/login', passport.authenticate('local'), async (req, res) => {
  res.json({ id: (req.user as UserAuth).id });
});

// User logout
app.post('/api/logout', ensureLoggedIn(), async (req, res) => {
  req.logOut((err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.send('ok');
    }
  });
});

// Get user info. Show all of user account info except the hashed password.
app.get(
  '/api/users/:id',
  ensureLoggedIn(),
  ensureCurrentUser('Cannot fetch data for other users'),
  async (req, res) => {
    try {
      const user = await db.user.findUniqueOrThrow({
        where: { id: parseInt(req.params.id) },
        include: {
          faves: true,
        },
      });

      res.json(_.omit(user, ['password']));
    } catch (e) {
      res.status(404).json({ error: (e as Error).message });
    }
  },
);

//patch the email and password for the user and hash the new password
//combining updating faves with updating user
//create a new fave or update (rather than delete) the fave by adding unfavedOn
//doing this within the patch ensures only logged in users can fave for themselves only
app.patch(
  '/api/users/:id',
  ensureLoggedIn(),
  ensureCurrentUser('Cannot update other users'),
  async (req, res) => {
    const id = parseInt(req.params.id);
    const data: UpdateUser = req.body;

    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    try {
      const currentUser = await db.user.findUniqueOrThrow({
        where: { id },
      });

      validation.User({ ...currentUser, ...data });

      console.log('Saving user', data);

      const user = await db.user.update({
        where: { id },
        data: {
          ...currentUser,
          ...data,
        },
        include: {
          faves: true,
        },
      });

      res.json(_.omit(user, ['password']));
    } catch (e) {
      res.status(404).json({ error: (e as Error).message });
    }
  },
);

// Delete the whole user account
app.delete(
  '/api/users/:id',
  ensureLoggedIn(),
  ensureCurrentUser('Cannot delete other users'),
  async (req, res) => {
    try {
      const user = await db.user.delete({
        where: { id: parseInt(req.params.id) },
      });
      res.json(_.omit(user, ['password']));
    } catch (e) {
      res.status(404).json({ error: (e as Error).message });
    }
  },
);

//no auth needed:

// Create a new account
app.post('/api/users', async (req, res) => {
  const data: NewUser = req.body;
  try {
    const birthday = parse(data.birthday, 'yyyy-MM-dd', new Date());
    // Validate new user before we send to the db
    validation.User({ ...data, birthday });

    // Send to the db
    const created = await db.user.create({
      data: {
        ...data,
        birthday,
        password: await hashPassword(data.password),
      },
    });

    // Log the user in
    req.logIn(created, (err) => {
      if (err) res.status(400).send('Cannot create user');

      res.status(201).json({
        id: created.id,
        name: created.name,
        email: created.email,
        birthday: created.birthday,
        // Don't send the password
      });
    });
  } catch (e) {
    console.error(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        // unique email validation failed
        res
          .status(400)
          .json({ error: 'Cannot create user: Email already exists' });
      }
    } else if ((e as Error).name === 'DataValidationError') {
      // failed validation
      res.status(400).json({ error: (e as Error).message });
    } else {
      //blanket error handling (any other error)
      res.status(400).json({ error: 'Cannot create user' });
    }
  }
});

// Get a single medication
app.get('/api/medications/:id', async (req, res) => {
  try {
    const medication = await db.medication.findUniqueOrThrow({
      where: { id: parseInt(req.params.id) },
    });
    res.json(medication);
  } catch (e) {
    res.status(404).json({ error: (e as Error).message });
  }
});

// Search for medications by brand or generic name
app.get('/api/medications', async (req, res) => {
  try {
    //holds user input
    const query = req.query.q as string;
    const result = await db.medication.findMany({
      // Query matches nameBrand or nameGeneric
      where: {
        OR: [
          {
            nameBrand: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            nameGeneric: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            prescribedFor: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            class: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            sideEffects: {
              search: query,
            },
          },
        ],
      },
    });

    res.json(result);
  } catch (e) {
    res.status(404).json({ error: (e as Error).message });
  }
});

// Get all conditions
app.get('/api/conditions', async (req, res) => {
  const conditions = await db.condition.findMany({
    orderBy: [{ id: 'asc' }],
  });

  res.json(conditions);
});

// Get single condition (with medications) for RxMatch
app.get('/api/conditions/:id', async (req, res) => {
  try {
    const condition = await db.condition.findUniqueOrThrow({
      where: { id: parseInt(req.params.id) },
      include: {
        medications: true,
      },
    });

    res.json(condition);
  } catch (e) {
    res.status(404).json({ error: (e as Error).message });
  }
});

// Start the server!
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// For all other routes, serve the client-side app.
ViteExpress.bind(app, server);
