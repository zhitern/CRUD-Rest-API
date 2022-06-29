"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployee = exports.deleteEmployee = exports.createEmployee = exports.getEmployee = exports.getEmployees = void 0;
const employeeModel_1 = require("./employeeModel");
//import {v4 as uuidv4} from 'uuid'
const getEmployees = (req, res, next) => {
    employeeModel_1.Employee.findAll().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).send('Error retrieving employees data');
    });
};
exports.getEmployees = getEmployees;
const getEmployee = (req, res, next) => {
    const id = req.params.id;
    employeeModel_1.Employee.findByPk(id).then((data) => {
        if (data)
            res.status(200).json(data);
        else
            res.status(500).send("Employee not found");
    }).catch((err) => {
        res.status(500).send('Error retrieving employees data');
    });
};
exports.getEmployee = getEmployee;
const createEmployee = (req, res, next) => {
    const employeeJSON = req.body;
    const { error, value } = employeeModel_1.employeeSchema.validate({
        name: employeeJSON.name,
        salary: employeeJSON.salary,
        department: employeeJSON.department
    }, { presence: "required" });
    if (error) {
        res.status(400).send(error.message);
        return;
    }
    const newEmployee = employeeModel_1.Employee.build({
        name: value.name,
        salary: value.salary,
        department: value.department
    });
    newEmployee.save().then(() => {
        console.log("Connection to postgres successful");
        res.status(200).json(newEmployee.toJSON());
    }).catch((err) => {
        console.log("Unable to create Employee. Error: " + err);
        res.status(400).send(err.message);
    });
};
exports.createEmployee = createEmployee;
const deleteEmployee = (req, res, next) => {
    const _id = req.params.id;
    employeeModel_1.Employee.findByPk(_id).then((data) => {
        if (data) {
            data.destroy().then(() => {
                res.status(200).json({ id: _id });
            }).catch((err) => {
                res.status(500).send('Error deleting employees data ' + err);
            });
        }
        else {
            res.status(404).send('Unalbe to retrieve employees data');
        }
    }).catch((err) => {
        res.status(404).send('Error retrieving employees data ' + err);
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
                res.status(400).send(error.message);
                return;
            }
            data.name = value.name;
            data.salary = value.salary;
            data.department = value.department;
            data.save().then(() => {
                res.status(200).json(data.toJSON());
            }).catch((err) => {
                res.status(500).send('Error retrieving employees data');
            });
        }
        else {
            res.status(404).send("Employee not found");
        }
    }).catch((err) => {
        res.status(404).send('Error retrieving employees data');
    });
};
exports.updateEmployee = updateEmployee;
