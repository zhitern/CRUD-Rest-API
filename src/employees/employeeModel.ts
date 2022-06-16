import { Model, DataTypes, CreationOptional } from 'sequelize';
import { database } from '../database';
import Joi from 'joi';

enum Department {
    HR,
    PS,
}

export class Employee extends Model {
    declare id: CreationOptional<Number>;
    declare name: String;
    declare salary: Number;
    declare department: String;
}

Employee.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    name: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    department: DataTypes.STRING
    
}, { 
    sequelize: database, 
    timestamps: false,
    modelName: 'Employee'
});

export const employeeSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .allow('/', ',')
        .min(3)
        .max(30),

    salary: Joi.number()
        .min(0)
        .precision(2)
        .sign("positive"),
    
    department: Joi.any()
        .valid('HR', 'PS')
});

Employee.sync();