"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployee = exports.deleteEmployee = exports.createEmployee = exports.getEmployee = exports.getEmployees = void 0;
const employeeModel_1 = require("./employeeModel");
//import {v4 as uuidv4} from 'uuid'
const getEmployees = (req, res, next) => {
    employeeModel_1.Employee.findAll().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.send('Error retrieving employees data');
    });
};
exports.getEmployees = getEmployees;
const getEmployee = (req, res, next) => {
    const id = req.params.id;
    employeeModel_1.Employee.findByPk(id).then((data) => {
        if (data)
            res.json(data);
        else
            res.send("Employee not found");
    }).catch((err) => {
        res.send('Error retrieving employees data');
    });
};
exports.getEmployee = getEmployee;
const createEmployee = (req, res, next) => {
    const employeeJSON = req.body;
    const uniqueID = Date.now();
    const { error, value } = employeeModel_1.employeeSchema.validate({
        name: employeeJSON.name,
        salary: employeeJSON.salary,
        department: employeeJSON.department
    }, { presence: "required" });
    if (error) {
        res.send(error.message);
        return;
    }
    const newEmployee = employeeModel_1.Employee.build({
        name: value.name,
        salary: value.salary,
        department: value.department
    });
    newEmployee.save().then(() => {
        console.log("Connection to postgres successful");
        res.send(`Added to database:\n${newEmployee.toJSON()}`);
    }).catch((err) => {
        console.log("Unable to create Employee. Error: " + err);
        res.send("Unable to create Employee. Error: " + err);
    });
};
exports.createEmployee = createEmployee;
const deleteEmployee = (req, res, next) => {
    const id = req.params.id;
    employeeModel_1.Employee.findByPk(id).then((data) => {
        if (data) {
            data.destroy().then(() => {
                res.send('Employee deleted successfully');
            }).catch((err) => {
                res.send('Error deleting employees data ' + err);
            });
        }
        else {
            res.send('Unalbe to retrieve employees data');
        }
    }).catch((err) => {
        res.send('Error retrieving employees data ' + err);
    });
};
exports.deleteEmployee = deleteEmployee;
const updateEmployee = (req, res, next) => {
    const id = req.params.id;
    employeeModel_1.Employee.findByPk(id).then((data) => {
        if (data) {
            const { name, salary, department } = req.body;
            const { error, value } = employeeModel_1.employeeSchema.validate({
                name: name,
                salary: salary,
                department: department
            });
            if (error) {
                res.send(error.message);
                return;
            }
            data.name = value.name;
            data.salary = value.salary;
            data.department = value.department;
            data.save().then(() => {
                res.send("Employee updated successfully \n" + data.toJSON());
            }).catch((err) => {
                res.send('Error retrieving employees data');
            });
        }
        else {
            res.send("Employee not found");
        }
    }).catch((err) => {
        res.send('Error retrieving employees data');
    });
    // const id = req.params.id;
    // 
    // const employee = employeeList.find((employee) => employee.id == id);
    // if (employee) {
    //     if (name) employee.name = name;
    //     if (salary) employee.salary = salary;
    //     if (department)  employee.department = department;
    //     res.send('Employee updated');
    // }
    // else{
    //     res.send('Employee not found');    
    // }
};
exports.updateEmployee = updateEmployee;
// import { RequestHandler } from "express";
// import { Employee, EmployeeObj } from './employeeModel';
// import { sequelize } from '../app';
// //import {v4 as uuidv4} from 'uuid';
// let employeeList: EmployeeObj[] = [];
// export const getEmployees: RequestHandler = (req, res, next) => {
//     if (employeeList.length <= 0) {
//         res.send('No employees found');
//     }
//     else {
//         res.json({employees: employeeList});
//     }
// }
// export const getEmployee: RequestHandler<{id: Number}> = (req, res, next) => { 
//     const id = req.params.id;
//     const foundEmployee = employeeList.find((employee) => employee.id == id);
//     if (foundEmployee)
//         res.send(foundEmployee);
//     else
//         res.send("Employee not found");
// }
// export const createEmployee: RequestHandler = (req, res, next) => {
//     const employeeJSON = req.body;
//     const uniqueID = Date.now();
//     const newEmployee = new EmployeeObj(uniqueID, employeeJSON.name, employeeJSON.salary, employeeJSON.department);
//     const test = Employee.build({ name: employeeJSON.name, salary: employeeJSON.salary, department: employeeJSON.department});
//     res.send(test.name);
//     // test.save().then(() => {
//     //     console.log("Connection to postgres successful");
//     //     res.send(`Employee with name ${newEmployee.name} added to the database`);
//     // }).catch((err) => {
//     //     console.log("Unable to create Employee. Error: " + err);
//     //     res.send("Unable to create Employee. Error: " + err);
//     // });
//     employeeList.push(newEmployee);
// }
// export const deleteEmployee: RequestHandler<{id: Number}> = (req, res, next) => {
//     const id = req.params.id;
//     employeeList = employeeList.filter((employee) => employee.id != id);
//     res.send(`employee with the id ${id} deleted from the database`)
// }
// export const updateEmployee: RequestHandler<{id: Number}> = (req, res, next) => {
//     const id = req.params.id;
//     const {name, salary, department} = req.body;
//     const employee = employeeList.find((employee) => employee.id == id);
//     if (employee) {
//         if (name) employee.name = name;
//         if (salary) employee.salary = salary;
//         if (department)  employee.department = department;
//         res.send('Employee updated');
//     }
//     else{
//         res.send('Employee not found');    
//     }
// }
