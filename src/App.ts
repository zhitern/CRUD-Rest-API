import express, { Request, Response, NextFunction } from "express";
import { json } from 'body-parser';
import employeeRoutes from "./employees/employeesRoutes";
import { Sequelize } from 'sequelize';

const PORT = 3000;
const app = express();

export const sequelize = new Sequelize({
    host: '::1',
    port: 3000,
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgres'
})

sequelize.authenticate().then(() => {
    console.log("Connection to postgres successful");
}).catch((err) => {
    console.log("Unable to connect to postgres. Error: " + err);
});

app.use(json());

app.use('/employees', employeeRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

app.listen(PORT, () => {
    console.log(`Console listening at PORT:${PORT}`);
});