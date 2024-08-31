import { db_company } from '../connections/db_company';
import { DataTypes, Optional, Model } from 'sequelize';

type SucursalAttributes = {
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

type SucursalCreationAttributes = Optional<SucursalAttributes, 'CODIGO'>;

export class Sucursal extends Model<SucursalAttributes, SucursalCreationAttributes> implements SucursalAttributes {
  ZONA!: string;
  CCOSTO!: string;
  CODIGO!: string;
  NOMBRE!: string;
  DIRECCION!: string;
  TIPO!: string;
  DISPOSITIVO!: string;
  SUPERVISOR!: string;
  CANAL!: string;
  CATEGORIA!: string;
  HORA_ENTRADA!: string;
  HORA_SALIDA!: string;
  HORA_ENTRADA_FES!: string;
  HORA_SALIDA_FES!: string;
  SUBZONA!: string;
  CELULA!: string;
  HORAS_ORDINARIAS!: number;
  HORAS_FESTIVAS!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Sucursal.init({
  ZONA: { type: DataTypes.STRING(50), allowNull: false },
  CCOSTO: { type: DataTypes.STRING(50), allowNull: false },
  CODIGO: { type: DataTypes.STRING(50), primaryKey: true, allowNull: false },
  NOMBRE: { type: DataTypes.STRING(50), allowNull: false },
  DIRECCION: { type: DataTypes.STRING(50), allowNull: false },
  TIPO: { type: DataTypes.STRING(50), allowNull: false },
  DISPOSITIVO: { type: DataTypes.STRING(50), allowNull: false },
  SUPERVISOR: { type: DataTypes.STRING(50), allowNull: false },
  CANAL: { type: DataTypes.STRING(50), allowNull: false },
  CATEGORIA: { type: DataTypes.STRING(50), allowNull: true },
  HORA_ENTRADA: { type: DataTypes.STRING(50), allowNull: false },
  HORA_SALIDA: { type: DataTypes.STRING(50), allowNull: false },
  HORA_ENTRADA_FES: { type: DataTypes.STRING(50), allowNull: false },
  HORA_SALIDA_FES: { type: DataTypes.STRING(50), allowNull: false },
  SUBZONA: { type: DataTypes.STRING(50), allowNull: false },
  CELULA: { type: DataTypes.STRING(50), allowNull: false },
  HORAS_ORDINARIAS: { type: DataTypes.INTEGER, allowNull: false },
  HORAS_FESTIVAS: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize: db_company,
  timestamps: true
});