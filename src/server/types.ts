/** Information sent when authenticating a user. */
export type UserAuth = {
  id: number;
  name: string;
  email: string;
  password: string;
};

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
