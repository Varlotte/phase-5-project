import { vi, expect, it, describe } from "vitest";
import { verifyUser, hashPassword } from "./auth";
import db from "./db";

import type { Callback } from "./auth";

// Stub the pepper for our tests
process.env.ARGON_SECRET = "abc123";

//test verify
describe("verifyUser", () => {
  const email = "name@example.com";
  const password = "hunter2";

  it("returns error if db errors out", async () => {
    vi.spyOn(db.user, "findUnique").mockRejectedValueOnce(new Error("nope"));

    const cb: Callback = (err) => expect(err && err.message).toBe("nope");

    await verifyUser(email, password, cb);
  });

  it("returns false if user not found", async () => {
    vi.spyOn(db.user, "findUnique").mockResolvedValueOnce(null);

    const cb: Callback = (err, user) => expect(user).toBe(false);

    await verifyUser(email, password, cb);
  });

  it("returns false if passwords don't match", async () => {
    // @ts-expect-error
    vi.spyOn(db.user, "findUnique").mockResolvedValueOnce({
      id: 1,
      name: "Test",
      email,
      password: await hashPassword("hunter3"),
    });

    const cb: Callback = (err, user) => expect(user).toBe(false);

    await verifyUser(email, password, cb);
  });

  it("returns user object if passwords match", async () => {
    const userObj = {
      id: 1,
      name: "Test",
      email,
      password: await hashPassword("hunter2"),
    };

    // @ts-expect-error
    vi.spyOn(db.user, "findUnique").mockResolvedValueOnce(userObj);

    const cb: Callback = (err, user) => expect(user).toEqual(userObj);

    await verifyUser(email, password, cb);
  });
});
