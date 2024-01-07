"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const yaml_1 = require("yaml");
const db_1 = __importDefault(require("./db"));
function parseData() {
    try {
        const filepath = (0, path_1.join)(__dirname, "seed.yml");
        const contents = (0, fs_1.readFileSync)(filepath, "utf8");
        return (0, yaml_1.parse)(contents);
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const yaml = parseData();
        const mapping = {};
        // seed the conditions into the db
        yield Promise.all(Object.keys(yaml.conditions).map((conditionKey) => __awaiter(this, void 0, void 0, function* () {
            const condition = yaml.conditions[conditionKey];
            const created = yield db_1.default.condition.upsert({
                where: { name: condition.name },
                update: condition,
                create: condition,
            });
            mapping[conditionKey] = created.id;
        })));
        // seed the medications into the db
        yield Promise.all(yaml.medications.map((medication) => __awaiter(this, void 0, void 0, function* () {
            const data = Object.assign(Object.assign({}, medication), { conditions: {
                    connect: medication.conditions.map((conditionKey) => ({
                        id: mapping[conditionKey],
                    })),
                } });
            return db_1.default.medication.upsert({
                where: { nameGeneric: data.nameGeneric },
                update: data,
                create: data,
            });
        })));
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield db_1.default.$disconnect();
    process.exit(1);
}));
