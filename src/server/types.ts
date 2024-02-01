import type { Request as ExpressRequest } from 'express';

export type UpdateUser = {
  email?: string;
  name?: string;
};

export type NewUser = {
  uid: string;
  birthday: string;
  name: string;
  email: string;
};

/** req.user object */
export type RequestUser = {
  uid: string;
  email?: string;
  displayName?: string;
};

/** Extend the Express Request object to add user data from Firebase. */
export interface Request extends ExpressRequest {
  user?: RequestUser;
}
