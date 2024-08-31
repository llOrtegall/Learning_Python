import { RowDataPacket, PoolOptions } from 'mysql2';

export interface Vendedor extends RowDataPacket {
  DOCUMENTO: string;
  NOMBRES: string;
  GRPVTAS_CODIGO: string;
  CARGO: string;
  VERSION: string;
  NOMBRECARGO: string;
  CCOSTO: string;
}

export interface Sucursal extends RowDataPacket {
  ZONA: string;
  CCOSTO: string;
  CODIGO: string;
  NOMBRE: string;
  DIRECCION: string;
  TIPO: string;
  DISPOSITIVO: string;
  SUPERVISOR: string;
  CANAL: string;
  CATEGORIA: string;
  HORA_ENTRADA: string;
  HORA_SALIDA: string;
  HORA_ENTRADA_FES: string;
  HORA_SALIDA_FES: string;
  SUBZONA: string;
  CELULA: string;
  HORAS_ORDINARIAS: number;
  HORAS_FESTIVAS: number;
}

export interface DbConfig extends PoolOptions {
  host: string;
  user: string;
  port: number;
  password: string;
  database: string;
}