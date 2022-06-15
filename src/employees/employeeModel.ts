import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../app';

enum Department {
    HR,
    PS,
}

export class Employee extends Model {}

Employee.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    salary: {
        type: DataTypes.INTEGER
    },
    department: {
        type: DataTypes.STRING
    }
}, { sequelize, timestamps: false });

Employee.sync();

export class EmployeeObj {
    constructor (public id: Number, public name: String, public salary: Number, public department: Department){
    }
}