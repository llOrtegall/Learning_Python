import { metas } from '../connections/metas'
import { DataTypes, Model, Optional } from 'sequelize'

type MetaAttributes = {
  FECHA: string
  CHANCE: number
  PROMEDIO_DIARIO_CHANCE: number
  PAGAMAS: number
  PROMEDIO_DIARIO_PAGAMAS: number
  PAGATODO: number
  PROMEDIO_DIARIO_PAGATODO: number
  PAGATODO_JAMUNDI: number
  CHOLADITO: number
  PATA_MILLONARIA: number
  PROMEDIO_DIARIO_PATAMI: number
  DOBLECHANCE: number
  PROMEDIO_DIARIO_DOBLECHANCE: number
  CHANCE_MILLONARIO: number
  ASTRO: number
  PROMEDIO_DIARIO_ASTRO: number
  LOTERIA_FISICA: number
  LOTERIA_VIRTUAL: number
  BETPLAY: number
  GIROS: number
  SOAT: number
  RECAUDOS: number
  RECARGAS: number
  ZONA: string
  CCOSTO: string
  SUCURSAL: string
}

type MetaCreationAttributes = Optional<MetaAttributes, 'FECHA'>

class Meta extends Model<MetaAttributes, MetaCreationAttributes> implements MetaAttributes {
  public FECHA!: string
  public CHANCE!: number
  public PAGAMAS!: number
  public PAGATODO!: number
  public PAGATODO_JAMUNDI!: number
  public CHOLADITO!: number
  public PATA_MILLONARIA!: number
  public DOBLECHANCE!: number
  public CHANCE_MILLONARIO!: number
  public ASTRO!: number
  public LOTERIA_FISICA!: number
  public LOTERIA_VIRTUAL!: number
  public BETPLAY!: number
  public GIROS!: number
  public SOAT!: number
  public RECAUDOS!: number
  public RECARGAS!: number
  public ZONA!: string
  public CCOSTO!: string
  public SUCURSAL!: string
  public PROMEDIO_DIARIO_CHANCE!: number
  public PROMEDIO_DIARIO_PAGAMAS!: number
  public PROMEDIO_DIARIO_PAGATODO!: number
  public PROMEDIO_DIARIO_PATAMI!: number
  public PROMEDIO_DIARIO_DOBLECHANCE!: number
  public PROMEDIO_DIARIO_ASTRO!: number
}

Meta.init({
  FECHA: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  CHANCE: { type: DataTypes.FLOAT, allowNull: false },
  PROMEDIO_DIARIO_CHANCE: { type: DataTypes.FLOAT, allowNull: false },
  PAGAMAS: { type: DataTypes.FLOAT, allowNull: false },
  PROMEDIO_DIARIO_PAGAMAS: { type: DataTypes.FLOAT, allowNull: false },
  PAGATODO: { type: DataTypes.FLOAT, allowNull: false },
  PROMEDIO_DIARIO_PAGATODO: { type: DataTypes.FLOAT, allowNull: false },
  PAGATODO_JAMUNDI: { type: DataTypes.FLOAT, allowNull: false },
  CHOLADITO: { type: DataTypes.FLOAT, allowNull: false },
  PATA_MILLONARIA: { type: DataTypes.FLOAT, allowNull: false },
  PROMEDIO_DIARIO_PATAMI: { type: DataTypes.FLOAT, allowNull: false },
  DOBLECHANCE: { type: DataTypes.FLOAT, allowNull: false },
  PROMEDIO_DIARIO_DOBLECHANCE: { type: DataTypes.FLOAT, allowNull: false },
  CHANCE_MILLONARIO: { type: DataTypes.FLOAT, allowNull: false },
  ASTRO: { type: DataTypes.FLOAT, allowNull: false },
  PROMEDIO_DIARIO_ASTRO: { type: DataTypes.FLOAT, allowNull: false },
  LOTERIA_FISICA: { type: DataTypes.FLOAT, allowNull: false },
  LOTERIA_VIRTUAL: { type: DataTypes.FLOAT, allowNull: false },
  BETPLAY: { type: DataTypes.FLOAT, allowNull: false },
  GIROS: { type: DataTypes.FLOAT, allowNull: false },
  SOAT: { type: DataTypes.FLOAT, allowNull: false },
  RECAUDOS: { type: DataTypes.FLOAT, allowNull: false },
  RECARGAS: { type: DataTypes.FLOAT, allowNull: false },
  ZONA: { type: DataTypes.STRING, allowNull: false },
  CCOSTO: { type: DataTypes.STRING, allowNull: false },
  SUCURSAL: { type: DataTypes.STRING, allowNull: false }
}, {
  sequelize: metas,
  tableName: 'METASPRODUCTOS',
  timestamps: false
})

export { Meta }