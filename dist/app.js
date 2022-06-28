"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const database_1 = require("./database");
const cors_1 = __importDefault(require("cors"));
const employeeRoutes_1 = __importDefault(require("./employees/employeeRoutes"));
const userRoutes_1 = __importDefault(require("./user/userRoutes"));
const PORT = 3001;
const app = (0, express_1.default)();
database_1.database.authenticate().then(() => {
    console.log("Connection to postgres successful");
}).catch((err) => {
    console.log("Unable to connect to postgres. Error: " + err);
});
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use('/employees', employeeRoutes_1.default);
app.use('/users', userRoutes_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.get('/', function (req, res) {
    res.send('GET request to homepage');
});
app.listen(PORT, () => {
    console.log(`Console listening at PORT:${PORT}`);
});
