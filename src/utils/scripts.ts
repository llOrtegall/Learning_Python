import { DbConfig, Sucursal, Vendedor } from './types'
import { format, toZonedTime } from 'date-fns-tz'
import mysql from 'mysql2/promise'
import { Meta } from '../models'
import 'dotenv/config'

const timeZone = 'America/Bogota'

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
      FECHA Date,
      HORA VARCHAR(10),
      ASTRO INT,
      ASTRO_META INT,
      CHANCE INT,
      CHANCE_META INT,
      PAGAMAS INT,
      PAGAMAS_META INT,
      PAGATODO INT,
      PAGATODO_META INT,
      PATA_MILLONARIA INT,
      PATA_MILLONARIA_META INT,
      DOBLECHANCE INT,
      DOBLECHANCE_META INT
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

  const tableName = `table_${codigo}` // Prefijo para evitar nombres de tablas no válidos

  const query = `
    INSERT INTO ${tableName} (FECHA, HORA, ASTRO, ASTRO_META, CHANCE, CHANCE_META, PAGAMAS, PAGAMAS_META, PAGATODO, PAGATODO_META, PATA_MILLONARIA, PATA_MILLONARIA_META, DOBLECHANCE, DOBLECHANCE_META) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `
  const now = new Date()
  const zonedDate = toZonedTime(now, timeZone)
  const fecha = format(zonedDate, 'yyyy-MM-dd', { timeZone })
  const hora = format(zonedDate, 'HH:mm', { timeZone })

  const values = [
    fecha,
    hora,
    data.ASTRO,
    (data.PROMEDIO_DIARIO_ASTRO / 2),
    data.CHANCE,
    (data.PROMEDIO_DIARIO_CHANCE / 3),
    data.PAGAMAS,
    (data.PROMEDIO_DIARIO_PAGAMAS / 2),
    data.PAGATODO,
    (data.PROMEDIO_DIARIO_PAGATODO / 2),
    data.PATA_MILLONARIA,
    (data.PROMEDIO_DIARIO_PATAMI / 2),
    data.DOBLECHANCE,
    (data.PROMEDIO_DIARIO_DOBLECHANCE / 3)
  ]

  try {
    const [rows] = await connection.query(query, values)
    return rows
  } catch (error) {
    console.error(error)
    throw new Error('Error al insertar datos en la tabla')
  }
}