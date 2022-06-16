"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeSchema = exports.Employee = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const joi_1 = __importDefault(require("joi"));
var Department;
(function (Department) {
    Department[Department["HR"] = 0] = "HR";
    Department[Department["PS"] = 1] = "PS";
})(Department || (Department = {}));
class Employee extends sequelize_1.Model {
}
exports.Employee = Employee;
Employee.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    name: sequelize_1.DataTypes.STRING,
    salary: sequelize_1.DataTypes.INTEGER,
    department: sequelize_1.DataTypes.STRING
}, {
    sequelize: database_1.database,
    timestamps: false,
    modelName: 'Employee'
});
exports.employeeSchema = joi_1.default.object({
    name: joi_1.default.string()
        .alphanum()
        .allow('/', ',')
        .min(3)
        .max(30),
    salary: joi_1.default.number()
        .min(0)
        .precision(2)
        .sign("positive"),
    department: joi_1.default.any()
        .valid('HR', 'PS')
});
Employee.sync();
