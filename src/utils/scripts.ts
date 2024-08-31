import { DbConfig, Sucursal, Vendedor } from './types'
import mysql from 'mysql2/promise'
import 'dotenv/config'

const HOST = process.env.DB_POWERBI_HOST!
const USER = process.env.DB_POWERBI_USER!
const PORT = parseInt(process.env.DB_POWERBI_PORT!)
const PASSWORD = process.env.DB_POWERBI_PASS!
const DATABASE = process.env.DB_POWERBI_DB!

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

