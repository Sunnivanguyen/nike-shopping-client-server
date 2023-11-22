const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

const ProductEntity = require('./productEntity');

class ProductDetailEntity extends Model {}

ProductDetailEntity.init(
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
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: connectMysql,
    modelName: 'ProductDetail',
    tableName: 'product_details',
    timestamps: false,
  },
);

ProductEntity.hasMany(ProductDetailEntity, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

ProductDetailEntity.belongsTo(ProductEntity, {
  foreignKey: 'product_id',
});

module.exports = ProductDetailEntity;
