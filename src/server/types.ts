import type { Request as ExpressRequest } from 'express';

type CreateFave = {
  medication: {
    connect: { id: number };
  };
};

type WhereFave = {
  userUid_medicationId: {
    userUid: string;
    medicationId: number;
  };
};

type UpdateFave = {
  unfavedOn: Date | null;
};

type UpsertFave = {
  create: CreateFave;
  update: UpdateFave;
  where: WhereFave;
};

/**
 * Users can add and remove faves. Adding creates a new fave, while "removing"
 * just sets the unfavedOn timestamp.
 */
type ModifyFaves = {
  upsert: UpsertFave;
  update: {
    where: WhereFave;
    data: UpdateFave;
  };
};

export type UpdateUser = {
  email?: string;
  name?: string;
  faves?: ModifyFaves;
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
