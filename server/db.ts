import { PrismaClient } from "@prisma/client";
import { createValidationMiddleware } from "prisma-validation-middleware";
import {
  object,
  string,
  nonempty,
  date,
  size,
  pattern,
  assert,
  mask,
  Struct,
  refine,
} from "superstruct";
import { differenceInYears } from "date-fns";

const client = new PrismaClient();

function validate<T extends Struct<any, any>>(struct: T) {
  return (data: any) => assert<T, any>(mask(data, struct), struct);
}

function isAdult(input: Date) {
  const now = Date.now();

  return differenceInYears(now, input) >= 18;
}

// validate our data based on business logic
client.$use(
  createValidationMiddleware({
    User: validate(
      object({
        // user fields
        name: nonempty(string()),
        password: size(string(), 12, Infinity),
        email: pattern(string(), /@/),
        birthday: refine(date(), "adult", isAdult),
      })
    ),
    Medication: validate(
      object({
        //medication fields
        nameBrand: nonempty(string()),
        nameGeneric: nonempty(string()),
      })
    ),
    Condition: validate(
      object({
        name: nonempty(string()),
      })
    ),
  })
);

export default client;

export type { Prisma } from "@prisma/client";
