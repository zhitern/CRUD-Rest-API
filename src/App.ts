import express, { Request, Response, NextFunction } from "express";
import { json } from 'body-parser';
import employeeRoutes from "./employees/employeesRoutes";

const PORT = 3000;
const app = express();

app.use(json());

app.use('/employees', employeeRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

app.listen(PORT, () => {
    console.log(`Console listening at PORT:${PORT}`);
});