import { Sequelize } from 'sequelize';
import 'dotenv/config';

const USER = process.env.DB_METAS_USER!;
const PASSWORD = process.env.DB_METAS_PASS!;
const HOST = process.env.DB_METAS_HOST!;
const DB = process.env.DB_METAS_DB!;

const metas = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: 'mysql'
});

export { metas }