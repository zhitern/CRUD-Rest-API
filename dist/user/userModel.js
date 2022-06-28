"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
const joi_1 = __importDefault(require("joi"));
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    userId: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database_1.database,
    timestamps: false,
    modelName: 'User'
});
exports.userSchema = joi_1.default.object({
    userId: joi_1.default.string()
        .alphanum()
        .allow('/', ',', ' ')
        .min(3)
        .max(30)
        .required(),
    password: joi_1.default.string()
        .min(3)
        .max(18)
        .required()
});
User.sync();
