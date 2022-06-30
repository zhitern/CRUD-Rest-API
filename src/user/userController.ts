import { RequestHandler } from "express";
import { User, userSchema } from './userModel';
import { database } from '../database';
import { Identifier } from "sequelize/types";

import bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"

const secretKey = "test";

//import {v4 as uuidv4} from 'uuid'

// export const getEmployees: RequestHandler = (req, res, next) => {

//     Employee.findAll().then((data) => {
//         res.status(200).json(data);
//     }).catch((err) => {
//         res.status(500).send('Error retrieving employees data');
//     });
// }

// export const getEmployee: RequestHandler<{id: Identifier}> = (req, res, next) => { 
//     const id = req.params.id;   
    
//     Employee.findByPk(id).then((data) => {
//         if (data)
//             res.status(200).json(data);
//         else
//             res.status(500).send("Employee not found");
//     }).catch((err) => {
//         res.status(500).send('Error retrieving employees data');
//     });
// }

export const Register: RequestHandler = async (req, res, next) => {
    const userJSON = req.body;

    const { error, value } = userSchema.validate({ 
        userId: userJSON.userId, 
        password: userJSON.password, 
     }, {presence: "required"});

     if (error) {
        console.log("validation faield: " + error.message);
        res.status(400).send(error.message);
        return;
     }

    const userFound = await User.findByPk(userJSON.userId);

    if (userFound !== null) {
        console.log("UserId already exist");
        res.status(400).send("UserId already exist");
        return;
    }

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(userJSON.password, salt);

    const newUser = User.build({
        userId: value.userId,
        password: hash,
    });

    newUser.save().then(() => {
        res.status(200).send(`Registered Successfully:\n${newUser.userId}`);
    }).catch((err) => {
        console.log("Unable to Register. Error: " + err);
        res.status(400).send(err.message);
    });
}

export const LogIn: RequestHandler = (req, res, next) => {
    const userJSON = req.body;
    
    User.findByPk(userJSON.userId).then((data) => {
        if (!data){
            console.log('UserId not found, data is null');
            res.status(500).send("UserId not found");
            return;
        }

        if (bcrypt.compareSync(userJSON.password, data?.password)) {
            const token = jwt.sign({userId: userJSON.userId}, secretKey, {algorithm:'HS256', expiresIn: '15m'});

            res.status(200).json({token: token});
        }
        else {
            console.log('Wrong password');
            res.status(500).send("Wrong Password");
        }
    }).catch((err) => {
        console.log('error caught, UserId not found: ' + err.message);
        res.status(500).send('UserId not found: ' + err.message);
    });
}

export const authenticate:RequestHandler = (req, res, nex) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        nex();
    })
}
// export const authenticate(req) {
    
// }

// export const deleteEmployee: RequestHandler<{id: Identifier}> = (req, res, next) => {
//     const id = req.params.id;   
    
//     Employee.findByPk(id).then((data) => {
//         if (data) {
//             data.destroy().then(() => {
//                 res.status(204).send('Employee deleted successfully');
//             }).catch((err) => {
//                 res.status(500).send('Error deleting employees data ' + err);
//             });
//         }
//         else {
//             res.status(404).send('Unalbe to retrieve employees data');
//         }
//     }).catch((err) => {
//         res.status(404).send('Error retrieving employees data ' + err);
//     });
// }

// export const updateEmployee: RequestHandler<{id: Identifier}> = (req, res, next) => {
//     const id = req.params.id;
    
//     Employee.findByPk(id).then((data) => {
//         if (data) {
//             const {name, salary, department} = req.body;

//             const { error, value } = employeeSchema.validate({ 
//                 name: name,
//                 salary: salary, 
//                 department: department
//              });
        
//              if (error) {
//                 res.status(400).send(error.message);
//                 return;
//              }

//             data.name = value.name;
//             data.salary = value.salary;
//             data.department = value.department;

//             data.save().then(() => {
//                 res.status(200).send("Employee updated successfully \n" + data.toJSON());
//             }).catch((err) => {
//                 res.status(500).send('Error retrieving employees data');
//             });
//         }
//         else {
//             res.status(404).send("Employee not found");
//         }

        
//     }).catch((err) => {
//         res.status(404).send('Error retrieving employees data');
//     });
// }



