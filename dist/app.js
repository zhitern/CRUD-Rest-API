"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const employeesRoutes_1 = __importDefault(require("./employees/employeesRoutes"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use('/employees', employeesRoutes_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(PORT, () => {
    console.log(`Console listening at PORT:${PORT}`);
});
