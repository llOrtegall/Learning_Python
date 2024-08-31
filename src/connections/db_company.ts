import { Sequelize } from 'sequelize';
import 'dotenv/config';

const USER = process.env.DB_COMPANY_USER!;
const PASSWORD = process.env.DB_COMPANY_PASS!;
const HOST = process.env.DB_COMPANY_HOST!;
const PORT = process.env.DB_COMPANY_PORT!;
const DB = process.env.DB_COMPANY_DB!;

export const db_company = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: 'mysql',
  port: parseInt(PORT),
  logging: false,
  timezone: '-05:00',
});