import { join } from "path";
import express from "express";
import session from "express-session";
import { parse } from "date-fns";
import db, { Prisma, validation } from "./db";
import passport, { hashPassword } from "./auth";
import type { UserAuth } from "./auth";

// instantiating a new app
const app = express();
// sets 3000 as default port but you can also pass in a specific one in an env variable
const port = process.env.PORT || 3000;
// serve the react app staticly
app.use(express.static(join(__dirname, "..", "client", "build")));
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

// api routes:

//these will all need auth:
//POST /login
app.post("/api/login", passport.authenticate("local"), async (req, res) => {
  res.send("ok");
});
//POST /logout
//GET, PATCH (to update email and password), and DELETE /users/id
//POST and DELETE user faves, protected to only add and delete faves to your own account

//no auth needed:

type NewUser = {
  birthday: string;
  name: string;
  email: string;
  password: string;
};

//POST /users (create new user)
app.post("/api/users", async (req, res) => {
  const data: NewUser = req.body;
  try {
    const birthday = parse(data.birthday, "yyyy-MM-dd", new Date());
    // validate new user before we send to the db
    validation.User({ ...data, birthday });

    // send to the db
    const created = await db.user.create({
      data: {
        ...data,
        birthday,
        password: await hashPassword(data.password),
      },
    });

    // TODO: get cookie on login
    // log the user in
    req.logIn(created, (err) => {
      if (err) res.status(400).send("Cannot create user");

      res.status(201).json({
        name: created.name,
        email: created.email,
        birthday: created.birthday,
        // don't send the password
      });
    });
  } catch (e) {
    console.error(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        // unique email validation failed
        res
          .status(400)
          .json({ error: "Cannot create user: Email already exists" });
      }
    } else if ((e as Error).name === "DataValidationError") {
      // failed validation
      res.status(400).json({ error: (e as Error).message });
    } else {
      //blanket error handling (any other error)
      res.status(400).json({ error: "Cannot create user" });
    }
  }
});

//GET medications by id
app.get("/api/medications/:id", async (req, res) => {
  try {
    const medication = await db.medication.findUniqueOrThrow({
      where: { id: parseInt(req.params.id) },
    });
    res.json(medication);
  } catch (e) {
    res.status(404).json({ error: (e as Error).message });
  }
});

//GET medication by brand and generic name for search
app.get("/api/medications", async (req, res) => {
  try {
    //holds user input
    const query = req.query.q as string;
    const result = await db.medication.findMany({
      //query matches nameBrand or nameGeneric
      where: {
        OR: [
          {
            nameBrand: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            nameGeneric: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            prescribedFor: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            class: {
              contains: query,
              mode: "insensitive",
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

//GET for all conditions (fully implemented!)
app.get("/api/conditions", async (req, res) => {
  const conditions = await db.condition.findMany({
    orderBy: [{ id: "asc" }],
  });

  res.json(conditions);
});
//GET condition by ID for the tinder UI
app.get("/api/conditions/:id", async (req, res) => {
  try {
    const condition = await db.condition.findUniqueOrThrow({
      where: { id: parseInt(req.params.id) },
    });
    res.json(condition);
  } catch (e) {
    res.status(404).json({ error: (e as Error).message });
  }
});

// for all other routes, return to the index so the SPA routing can handle it
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
