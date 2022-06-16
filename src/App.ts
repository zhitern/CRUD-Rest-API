import express, { Request, Response, NextFunction } from "express";
import { json } from 'body-parser';
import employeeRoutes from "./employees/employeesRoutes";
import { database } from "./database";

const PORT = 3000;
const app = express();

database.authenticate().then(() => {
    console.log("Connection to postgres successful");
}).catch((err) => {
    console.log("Unable to connect to postgres. Error: " + err);
});

app.use(json());
app.use('/employees', employeeRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

app.get('/', function (req, res) {
    res.send('GET request to homepage')
})

app.listen(PORT, () => {
    console.log(`Console listening at PORT:${PORT}`);
});