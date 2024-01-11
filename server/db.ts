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

// exported for testing
export function isAdult(input: Date, currentDate = new Date()) {
  return differenceInYears(currentDate, input) >= 18;
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
        birthday: refine(date(), "adult", (val) => isAdult(val)),
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