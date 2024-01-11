import crypto from "crypto";

import passport from "passport";
import LocalStrategy from "passport-local";
import db from "./db";

type UserAuth = {
  id: number;
  name: string;
  email: string;
  password: string;
};

//establishing types for the variables called in verify
export type Callback = (err: Error | null, user?: UserAuth | false) => void;

//hashes the password on the db side
// exported for testing
export function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

//checking password that's passed in against the hashed pw in db
// exported for testing
export function verifyPassword(
  savedPassword: string,
  submittedPassword: string
) {
  const hashed = hashPassword(submittedPassword);

  return hashed === savedPassword;
}

//checking to see if the user is in the database at all
// exported for testing
export async function verify(email: string, password: string, cb: Callback) {
  try {
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      return cb(null, false);
    }

    if (!verifyPassword(user.password, password)) {
      return cb(null, false);
    }

    return cb(null, user);
  } catch (e) {
    return cb(e as Error);
  }
}
