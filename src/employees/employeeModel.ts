import { Model } from 'sequelize';

enum Department {
    HR,
    PS,
}

export class Employee {
    constructor (public id: Number, public name: String, public salary: Number, public department: Department){
    }
}