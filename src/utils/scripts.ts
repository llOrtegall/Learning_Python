import { DbConfig, Sucursal, Vendedor } from './types'
import mysql from 'mysql2/promise'
import { Meta } from '../models'
import 'dotenv/config'
import { getTime } from './time'



// const HOST = process.env.DB_POWERBI_HOST!
// const USER = process.env.DB_POWERBI_USER!
// const PORT = parseInt(process.env.DB_POWERBI_PORT!)
// const PASSWORD = process.env.DB_POWERBI_PASS!
// const DATABASE = process.env.DB_POWERBI_DB!

const HOST = process.env.DB_COMPANY_HOST!
const USER = process.env.DB_COMPANY_USER!
const PORT = parseInt(process.env.DB_COMPANY_PORT!)
const PASSWORD = process.env.DB_COMPANY_PASS!
const DATABASE = process.env.DB_COMPANY_DB!

// Configuración de la conexión
const dbConfig: DbConfig = {
  host: HOST,
  user: USER,
  port: PORT,
  password: PASSWORD,
  database: DATABASE
}

const connection = mysql.createPool(dbConfig)

// Función para obtener los vendedores
export const getVenPoweBi = async (ccosto: number): Promise<Vendedor[]> => {
  try {
    const [rows] = await connection.query<Vendedor[]>('SELECT * FROM VENDEDORES WHERE CCOSTO = ?', [ccosto])
    return rows
  } catch (error) {
    console.error(error)
    throw new Error('Error al obtener los vendedores')
  }
}
// Función para obtener las sucursales
export const getSucPoweBi = async (ccosto: number): Promise<Sucursal[]> => {
  try {
    const [rows] = await connection.query<Sucursal[]>('SELECT * FROM SUCURSALES WHERE CCOSTO = ?', [ccosto])
    return rows
  } catch (error) {
    console.error(error)
    throw new Error('Error al obtener los vendedores')
  }
}

export const dropTable = async (codigo: number) => {
  // Validar el nombre de la tabla para evitar inyecciones SQL
  if (!Number.isInteger(codigo) || codigo <= 0) {
    throw new Error('Código de tabla inválido')
  }

  const tableName = `table_${codigo}` // Prefijo para evitar nombres de tablas no válidos

  const query = `
    DROP TABLE IF EXISTS ${tableName};
  `

  try {
    const [rows] = await connection.query(query)
    return rows
  } catch (error) {
    console.error(error)
    throw new Error('Error al eliminar la tabla')
  }
}

export const createTable = async (codigo: number) => {
  // Validar el nombre de la tabla para evitar inyecciones SQL
  if (!Number.isInteger(codigo) || codigo <= 0) {
    throw new Error('Código de tabla inválido')
  }

  const tableName = `table_${codigo}` // Prefijo para evitar nombres de tablas no válidos

  const query = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      FECHA Date NOT NULL,
      HORA VARCHAR(10) NOT NULL PRIMARY KEY,
      ASTRO INT,
      CHANCE INT,
      PAGAMAS INT,
      PAGATODO INT,
      PATA_MILLONARIA INT,
      DOBLECHANCE INT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `

  try {
    const [rows] = await connection.query(query)
    return rows
  } catch (error) {
    console.error(error)
    throw new Error('Error al crear la tabla')
  }
}

export const inserDataintoTable = async (codigo: number, data: Meta) => {
  // Validar el nombre de la tabla para evitar inyecciones SQL
  if (!Number.isInteger(codigo) || codigo <= 0) {
    throw new Error('Código de tabla inválido')
  }

  const { fecha, hora } = getTime()

  try {
    await connection.execute(
      `INSERT INTO table_${codigo} (FECHA, HORA, ASTRO, CHANCE, PAGAMAS, PAGATODO, PATA_MILLONARIA, DOBLECHANCE) VALUES (?,?,?,?,?,?,?,?)`,
      [fecha, hora, data.ASTRO, data.CHANCE, data.PAGAMAS, data.PAGATODO, data.PATA_MILLONARIA, data.DOBLECHANCE]
    );
  } catch (error) {
    console.error(error)
    throw new Error('Error al insertar datos en la tabla')
  }
}

export const insertDataSinc = async (codigo: number) => {
  // Validar el nombre de la tabla para evitar inyecciones SQL
  if (!Number.isInteger(codigo) || codigo <= 0) {
    throw new Error('Código de tabla inválido')
  }

  const { fecha, hora } = getTime()

  try {
    await connection.execute(
      `INSERT INTO table_${codigo} (FECHA, HORA, ASTRO, CHANCE, PAGAMAS, PAGATODO, PATA_MILLONARIA, DOBLECHANCE) VALUES (?,?,?,?,?,?,?,?) `,
      [fecha, hora, 0, 0, 0, 0, 0, 0,]);
  } catch (error) {
    console.error(error)
    throw new Error('Error al insertar datos en la tabla')
  }
}