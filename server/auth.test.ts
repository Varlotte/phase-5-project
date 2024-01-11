import { vi, expect, it, describe } from "vitest";
import { verify, verifyPassword, hashPassword } from "./auth";
import db from "./db";

import type { Callback } from "./auth";

//creating a dummy version of the database to use for testing
// vi.mock("./db");

//test verifyPassword
describe("verifyPassword", () => {
  //this is a testable password we're running through the hash function
  const savedPassword = hashPassword("hunter2");

  it("returns true if passwords match", () => {
    expect(verifyPassword(savedPassword, "hunter2")).toBe(true);
  });

  it("returns false if passwords don't match", () => {
    expect(verifyPassword(savedPassword, "hunter3")).toBe(false);
  });
});

//test verify
describe("verify", () => {
  const email = "name@example.com";
  const password = "hunter2";

  it("returns error if db errors out", async () => {
    vi.spyOn(db.user, "findUnique").mockRejectedValueOnce(new Error("nope"));

    const cb: Callback = (err) => expect(err && err.message).toBe("nope");

    await verify(email, password, cb);
  });

  it("returns false if user not found", async () => {
    vi.spyOn(db.user, "findUnique").mockResolvedValueOnce(null);

    const cb: Callback = (err, user) => expect(user).toBe(false);

    await verify(email, password, cb);
  });

  it("returns false if passwords don't match", async () => {
    // @ts-expect-error
    vi.spyOn(db.user, "findUnique").mockResolvedValueOnce({
      id: 1,
      name: "Test",
      email,
      password: hashPassword("hunter3"),
    });

    const cb: Callback = (err, user) => expect(user).toBe(false);

    await verify(email, password, cb);
  });

  it("returns user object if passwords match", async () => {
    const userObj = {
      id: 1,
      name: "Test",
      email,
      password: hashPassword("hunter2"),
    };

    // @ts-expect-error
    vi.spyOn(db.user, "findUnique").mockResolvedValueOnce(userObj);

    const cb: Callback = (err, user) => expect(user).toEqual(userObj);

    await verify(email, password, cb);
  });
});
