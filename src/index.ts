import { Sequelize } from 'sequelize';
import 'dotenv/config';

const USER = process.env.DB_METAS_USER!;
const PASSWORD = process.env.DB_METAS_PASS!;
const HOST = process.env.DB_METAS_HOST!;
const DB = process.env.DB_METAS_DB!;

const sequelize = new Sequelize(DB, USER, PASSWORD, {
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