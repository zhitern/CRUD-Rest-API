import { RequestHandler } from "express";
import { Employee, employeeSchema } from './employeeModel';
import { database } from '../database';
import { Identifier } from "sequelize/types";

//import {v4 as uuidv4} from 'uuid'

export const getEmployees: RequestHandler = (req, res, next) => {

    Employee.findAll().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).send('Error retrieving employees data');
    });
}

export const getEmployee: RequestHandler<{id: Identifier}> = (req, res, next) => { 
    const id = req.params.id;   
    
    Employee.findByPk(id).then((data) => {
        if (data)
            res.status(200).json(data);
        else
            res.status(500).send("Employee not found");
    }).catch((err) => {
        res.status(500).send('Error retrieving employees data');
    });
}

export const createEmployee: RequestHandler = (req, res, next) => {
    const employeeJSON = req.body;

    const { error, value } = employeeSchema.validate({ 
        name: employeeJSON.name, 
        salary: employeeJSON.salary, 
        department: employeeJSON.department
     }, {presence: "required"});

     if (error) {
        res.status(400).send(error.message);
        return;
     }

    const newEmployee = Employee.build({
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
}

export const deleteEmployee: RequestHandler<{id: Identifier}> = (req, res, next) => {
    const _id = req.params.id;   
    
    Employee.findByPk(_id).then((data) => {
        if (data) {
            data.destroy().then(() => {
                res.status(200).json({id: _id});
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
}

export const updateEmployee: RequestHandler<{id: Identifier}> = (req, res, next) => {
    const id = req.params.id;
    
    Employee.findByPk(id).then((data) => {
        if (data) {
            const {name, salary, department} = req.body;

            const { error, value } = employeeSchema.validate({ 
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
}



