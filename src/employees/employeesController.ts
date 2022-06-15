import { RequestHandler } from "express";
import { EmployeeObj } from './employeeModel';
import { sequelize } from '../app';

//import {v4 as uuidv4} from 'uuid';

let employeeList: EmployeeObj[] = [];

export const getEmployees: RequestHandler = (req, res, next) => {
    if (employeeList.length <= 0) {
        res.send('No employees found');
    }
    else {
        res.json({employees: employeeList});
    }
}

export const getEmployee: RequestHandler<{id: Number}> = (req, res, next) => { 
    const id = req.params.id;

    const foundEmployee = employeeList.find((employee) => employee.id == id);
    if (foundEmployee)
        res.send(foundEmployee);
    else
        res.send("Employee not found");
}

export const createEmployee: RequestHandler = (req, res, next) => {
    const employeeJSON = req.body;
    const uniqueID = Date.now();
    const newEmployee = new EmployeeObj(uniqueID, employeeJSON.name, employeeJSON.salary, employeeJSON.dept);

    employeeList.push(newEmployee);

    res.send(`Employee with name ${newEmployee.name} added to the database`);
}

export const deleteEmployee: RequestHandler<{id: Number}> = (req, res, next) => {
    const id = req.params.id;

    employeeList = employeeList.filter((employee) => employee.id != id);

    res.send(`employee with the id ${id} deleted from the database`)
}

export const updateEmployee: RequestHandler<{id: Number}> = (req, res, next) => {
    const id = req.params.id;
    const {name, salary, department} = req.body;

    const employee = employeeList.find((employee) => employee.id == id);

    if (employee) {
        if (name) employee.name = name;
        if (salary) employee.salary = salary;
        if (department)  employee.department = department;

        res.send('Employee updated');
    }
    else{
        res.send('Employee not found');    
    }
}







// import {v4 as uuidv4} from 'uuid';

// let users = [];

// export const getUsers = (req, res) => {
//     res.send(users);
// }

// export const getUser = (req, res) => {
//     const { id } = req.params;

//     const foundUser = users.find((user) => user.id == id);

//     res.send(foundUser);
// }

// export const createUser = (req, res) => {
//     const user = req.body;

//     users.push({...user, id: uuidv4()});

//     res.send(`User with name ${user.firstName} added to the database`);
// }

// export const deleteUser = (req, res) => {
//     const { id } = req.params;

//     users = users.filter((user) => user.id != id);

//     res.send(`user with the id ${id} deleted from the database`)
// }

// export const updateUser = (req, res) => {
//     const { id } = req.params;
//     const {firstName, lastName, age} = req.body;

//     const user = users.find((user) => user.id == id);

//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (age)  user.age = age;

//     res.send('User updated');
// }