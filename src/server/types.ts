import type { Request as ExpressRequest } from 'express';

export type UpdateUser = {
  email?: string;
  password?: string;
};

export type NewUser = {
  birthday: string;
  name: string;
  email: string;
  password: string;
};

/** req.user object */
export type RequestUser = {
  id: number;
  email: string;
};

/** Extend the Express Request object to add user data from Firebase. */
export interface Request extends ExpressRequest {
  user?: RequestUser;
}
