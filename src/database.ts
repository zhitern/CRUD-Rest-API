import { Sequelize } from 'sequelize';

export const database = new Sequelize({
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgres'
});