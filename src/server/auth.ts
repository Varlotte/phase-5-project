import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import type { NextFunction, Response } from 'express';

import type { Request, RequestUser } from './types';

const app = initializeApp({
  credential: cert({
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
});

const auth = getAuth(app);

export default auth;

/** Check to make sure user is authenticated. */
export async function ensureLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decodeValue = await auth.verifyIdToken(token);

    if (decodeValue) {
      req.user = decodeValue as unknown as RequestUser;
      return next();
    }
  } catch (e: any) {
    // Log the full error on the server, but respond with a generic error.
    console.error(`Error when verifying auth token: ${e.message}`);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/** Make sure the current user is logged in when accessing routes under /user/:id */
export function ensureCurrentUser(errorMessage: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const uid = req.params.uid;

    if (req.user?.uid !== uid) {
      res.status(401).json({ error: errorMessage });
    } else {
      next();
    }
  };
}
