"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
//instantiating a new app
const app = (0, express_1.default)();
//sets 3000 as default port but you can also pass in a specific one in an env variable
const port = process.env.PORT || 3000;
app.use(express_1.default.static((0, path_1.join)(__dirname, "..", "client", "public")));
app.get("/", (req, res) => {
    res.sendFile((0, path_1.join)(__dirname, "..", "client", "public", "index.html"));
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
