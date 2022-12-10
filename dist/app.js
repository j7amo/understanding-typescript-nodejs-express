"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// this is not a NodeJS syntax for imports BUT we can do it because we are currently in TS environment
// and this code will be compiled into plain JS code which will use traditional 'require' for imports
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const todo_1 = __importDefault(require("./routes/todo"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use("/todos", todo_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(3000);
