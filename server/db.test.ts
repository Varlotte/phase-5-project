import { expect, it, describe } from "vitest";
import { isAdult } from "./db";

describe("isAdult", () => {
  const currentDate = new Date("2020-01-01T12:00:00");

  it("returns true if birthday was more than 18 years ago", () => {
    expect(isAdult(new Date("1990-01-01T12:00:00"), currentDate)).toBe(true);
  });

  it("returns false if birthday was less than 18 years ago", () => {
    expect(isAdult(new Date("2018-01-01T12:00:00"), currentDate)).toBe(false);
  });

  it("returns true if birthday is exactly 18 years ago", () => {
    expect(isAdult(new Date("2002-01-01T12:00:00"), currentDate)).toBe(true);
  });

  it("returns false if birthday is in the future", () => {
    expect(isAdult(new Date("2024-01-07T12:00:00"), currentDate)).toBe(false);
  });
});
