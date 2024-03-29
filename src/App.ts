import express, { Request, Response, NextFunction } from "express";
import { json } from 'body-parser';
import { database } from "./database";
import cors from 'cors';
import * as dotenv from 'dotenv';

import employeeRoutes from "./employees/employeeRoutes";
import userRoutes from "./user/userRoutes"

dotenv.config();

const PORT = parseInt(process.env.PORT as string);
const app = express();


database.authenticate().then(() => {
    console.log("Connection to postgres successful");
}).catch((err) => {
    console.log("Unable to connect to postgres. Error: " + err);
});

app.use(cors());
app.use(json());
app.use('/employees', employeeRoutes);
app.use('/users', userRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

app.get('/', function (req, res) {
    res.send('GET request to homepage')
})

app.listen(PORT, () => {
    console.log(`Console listening at PORT:${PORT}`);
});