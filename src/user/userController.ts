import { RequestHandler } from "express";
import { User, userSchema } from './userModel';
import { database } from '../database';
import { Identifier } from "sequelize/types";

import bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"

const secretKey = process.env.SECRET_KEY;

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
            const token = jwt.sign({userId: userJSON.userId}, secretKey as string, {algorithm:'HS256', expiresIn: '15m'});

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

    jwt.verify(token, secretKey as string, (err, user) => {
        if (err) return res.sendStatus(403);
        nex();
    })
}
