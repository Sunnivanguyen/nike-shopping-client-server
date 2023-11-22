const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

const ProductEntity = require('./productEntity');

class ProductSizeEntity extends Model {}

ProductSizeEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    in_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: connectMysql,
    modelName: 'ProductSizeEntity',
    tableName: 'product_sizes',
    timestamps: false,
  },
);

ProductEntity.hasMany(ProductSizeEntity, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

ProductSizeEntity.belongsTo(ProductEntity, {
  foreignKey: 'product_id',
});

module.exports = ProductSizeEntity;
