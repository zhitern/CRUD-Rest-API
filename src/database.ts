import { Sequelize } from 'sequelize';

export const database = new Sequelize({
    host: 'database',
    port: 5432,
    dialect: 'postgres',
    username: 'postgres',
    password: 'postgres'
});