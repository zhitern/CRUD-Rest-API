"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    constructor(id, name, salary, department) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
    }
}
exports.Employee = Employee;
var Department;
(function (Department) {
    Department[Department["HR"] = 0] = "HR";
    Department[Department["PS"] = 1] = "PS";
})(Department || (Department = {}));
