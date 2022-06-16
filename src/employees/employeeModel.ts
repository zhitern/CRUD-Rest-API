import { Model, DataTypes, CreationOptional } from 'sequelize';
import { database } from '../database';

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

Employee.sync();