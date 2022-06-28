import { Model, DataTypes, CreationOptional } from 'sequelize';
import { database } from '../database';
import Joi from 'joi';

export class User extends Model {
    declare userId: string;
    declare password: string;
}

User.init({
    userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
}, { 
    sequelize: database, 
    timestamps: false,
    modelName: 'User'
});

export const userSchema = Joi.object({
    userId: Joi.string()
        .alphanum()
        .allow('/', ',', ' ')
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .min(3)
        .max(18)
        .required()
});

User.sync();