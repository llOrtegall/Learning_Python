"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv/config");
const USER = process.env.DB_METAS_USER;
const PASSWORD = process.env.DB_METAS_PASS;
const HOST = process.env.DB_METAS_HOST;
const DB = process.env.DB_METAS_DB;
const sequelize = new sequelize_1.Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: 'mysql'
});
sequelize.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
