import { hash, verify } from 'argon2';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import db from './db';

export type UserAuth = {
  id: number;
  name: string;
  email: string;
  password: string;
};

// this is in a separate function so we can override the env variable when testing
function getSecret() {
  const secret = process.env.ARGON_SECRET;

  if (!secret) {
    // make sure we set a password hashing pepper in all environments
    throw new Error(
      'Please add a ARGON_SECRET env variable with sufficiently random data',
    );
  }

  return secret as string;
}

// hash the password using a pepper
// exported for testing
export async function hashPassword(password: string) {
  // follow best practices from:
  // https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
  return hash(password, { secret: Buffer.from(getSecret()) });
}

// establishing types for the variables called in verify
export type Callback = (err: Error | null, user?: UserAuth | false) => void;

// checking to see if the user is in the database at all
// exported for testing
export async function verifyUser(
  email: string,
  password: string,
  cb: Callback,
) {
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

    if (
      !(await verify(user.password, password, {
        secret: Buffer.from(getSecret()),
      }))
    ) {
      return cb(null, false);
    }

    return cb(null, user);
  } catch (e) {
    return cb(e as Error);
  }
}

passport.use(new LocalStrategy({ usernameField: 'email' }, verifyUser));

export default passport;
