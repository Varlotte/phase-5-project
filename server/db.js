"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma_validation_middleware_1 = require("prisma-validation-middleware");
const superstruct_1 = require("superstruct");
const date_fns_1 = require("date-fns");
const client = new client_1.PrismaClient();
function validate(struct) {
    return (data) => (0, superstruct_1.assert)((0, superstruct_1.mask)(data, struct), struct);
}
function isAdult(input) {
    const now = Date.now();
    return (0, date_fns_1.differenceInYears)(now, input) >= 18;
}
// validate our data based on business logic
client.$use((0, prisma_validation_middleware_1.createValidationMiddleware)({
    User: validate((0, superstruct_1.object)({
        // user fields
        name: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
        password: (0, superstruct_1.size)((0, superstruct_1.string)(), 12, Infinity),
        email: (0, superstruct_1.pattern)((0, superstruct_1.string)(), /@/),
        birthday: (0, superstruct_1.refine)((0, superstruct_1.date)(), 'adult', isAdult),
    })),
    Medication: validate((0, superstruct_1.object)({
        //medication fields
        nameBrand: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
        nameGeneric: (0, superstruct_1.nonempty)((0, superstruct_1.string)())
    })),
    Condition: validate((0, superstruct_1.object)({
        name: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
    }))
}));
exports.default = client;
