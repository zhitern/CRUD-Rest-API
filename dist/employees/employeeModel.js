"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
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
Employee.sync();
