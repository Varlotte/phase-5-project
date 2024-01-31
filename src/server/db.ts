import { PrismaClient } from '@prisma/client';
import { differenceInYears } from 'date-fns';
import { createValidationMiddleware } from 'prisma-validation-middleware';
import {
  assert,
  date,
  mask,
  nonempty,
  object,
  pattern,
  refine,
  size,
  string,
  Struct,
  type as typeStruct,
} from 'superstruct';
import type { StructError } from 'superstruct';

const client = new PrismaClient();

function validate<T extends Struct<any, any>>(struct: T) {
  return (data: any) => {
    try {
      assert<T, any>(mask(data, struct), struct);
    } catch (e) {
      const { key, message } = e as StructError;
      const rethrow = new Error(`Cannot save ${key}: ${message}`);

      rethrow.name = 'DataValidationError';
      throw rethrow;
    }
  };
}

// exported for testing
export function isAdult(input: Date, currentDate = new Date()) {
  return differenceInYears(currentDate, input) >= 18;
}

export const validation = {
  User: validate(
    typeStruct({
      // user fields
      name: nonempty(string()),
      password: size(string(), 12, Infinity),
      email: pattern(string(), /@/),
      birthday: refine(date(), 'adult', (val) => isAdult(val)),
    }),
  ),
  Medication: validate(
    object({
      //medication fields
      nameBrand: nonempty(string()),
      nameGeneric: nonempty(string()),
    }),
  ),
  Condition: validate(
    object({
      name: nonempty(string()),
    }),
  ),
};

// validate our data based on business logic
client.$use(
  createValidationMiddleware(validation, {
    customizeError: (error, params) => ({
      name: 'DataValidationError',
      message: `Cannot save ${params.model}: ${error.message}`,
    }),
  }),
);

export default client;

// Export prisma types from the generated client.
export { Prisma } from '@prisma/client';
