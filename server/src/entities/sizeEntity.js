const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

const ProductSizeEntity = require('./productSizeEntity');

class SizeEntity extends Model {}

SizeEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    size: {
      type: DataTypes.DECIMAL(10, 1),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: connectMysql,
    modelName: 'SizeEntity',
    tableName: 'sizes',
    timestamps: false,
  },
);

SizeEntity.hasMany(ProductSizeEntity, {
  foreignKey: 'size_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

ProductSizeEntity.belongsTo(SizeEntity, {
  foreignKey: 'size_id',
});

module.exports = SizeEntity;
