import { DbConfig,Sucursal,Vendedor } from './types'
import mysql from 'mysql2/promise'
import 'dotenv/config'
import { Meta } from '../models'

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
    const [rows] = await connection.query<Vendedor[]>('SELECT * FROM VENDEDORES WHERE CCOSTO = ?',[ccosto])
    return rows
  } catch (error) {
    console.error(error)
    throw new Error('Error al obtener los vendedores')
  }
}
// Función para obtener las sucursales
export const getSucPoweBi = async (ccosto: number): Promise<Sucursal[]> => {
  try {
    const [rows] = await connection.query<Sucursal[]>('SELECT * FROM SUCURSALES WHERE CCOSTO = ?',[ccosto])
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
      CHANCE INT,
      PAGAMAS INT,
      PAGATODO INT,
      PAGATODO_JAMUNDI INT,
      CHOLADITO INT,
      PATA_MILLONARIA INT,
      DOBLECHANCE INT,
      CHANCE_MILLONARIO INT,
      ASTRO INT,
      LOTERIA_FISICA INT,
      LOTERIA_VIRTUAL INT,
      BETPLAY INT,
      GIROS INT,
      SOAT INT,
      RECAUDOS INT,
      RECARGAS INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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

export const inserDataintoTable = async (codigo: number,data: Meta) => {
  // Validar el nombre de la tabla para evitar inyecciones SQL
  if (!Number.isInteger(codigo) || codigo <= 0) {
    throw new Error('Código de tabla inválido')
  }

  const tableName = `table_${codigo}` // Prefijo para evitar nombres de tablas no válidos


  const query = `
    INSERT INTO ${tableName} (CHANCE, PAGAMAS, PAGATODO, PAGATODO_JAMUNDI, CHOLADITO, PATA_MILLONARIA, DOBLECHANCE, CHANCE_MILLONARIO, ASTRO, LOTERIA_FISICA, LOTERIA_VIRTUAL, BETPLAY, GIROS, SOAT, RECAUDOS, RECARGAS) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `
  const values = [data.CHANCE, data.PAGAMAS, data.PAGATODO, data.PAGATODO_JAMUNDI, data.CHOLADITO, data.PATA_MILLONARIA, data.DOBLECHANCE, data.CHANCE_MILLONARIO, data.ASTRO, data.LOTERIA_FISICA, data.LOTERIA_VIRTUAL, data.BETPLAY, data.GIROS, data.SOAT, data.RECAUDOS, data.RECARGAS]

  try {
    const [rows] = await connection.query(query,values)
    return rows
  } catch (error) {
    console.error(error)
    throw new Error('Error al insertar datos en la tabla')
  }
}