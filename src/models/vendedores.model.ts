import { db_company } from '../connections/db_company';
import { DataTypes, Optional, Model } from 'sequelize';

type VendedoresAttributes = {
  DOCUMENTO: string;
  NOMBRES: string;
  GRPVTAS_CODIGO: string;
  CARGO: string;
  VERSION: string;
  NOMBRECARGO: string;
  CCOSTO: string;
}

type VendedoresCreationAttributes = Optional<VendedoresAttributes, 'DOCUMENTO'>;

export class Vendedores extends Model<VendedoresAttributes, VendedoresCreationAttributes> implements VendedoresAttributes {
  DOCUMENTO!: string;
  NOMBRES!: string;
  GRPVTAS_CODIGO!: string;
  CARGO!: string;
  VERSION!: string;
  NOMBRECARGO!: string;
  CCOSTO!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Vendedores.init({
  DOCUMENTO: { type: DataTypes.STRING(50), primaryKey: true, allowNull: false },
  NOMBRES: { type: DataTypes.STRING(100), allowNull: false },
  GRPVTAS_CODIGO: { type: DataTypes.STRING(50), allowNull: false },
  CARGO: { type: DataTypes.STRING(50), allowNull: false },
  VERSION: { type: DataTypes.STRING(50), allowNull: false },
  NOMBRECARGO: { type: DataTypes.STRING(50), allowNull: false },
  CCOSTO: { type: DataTypes.STRING(50), allowNull: false }
}, {
  sequelize: db_company,
  tableName: 'Vendedores',
  timestamps: true
});
