const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

const ProductEntity = require('./productEntity');

class ProductImageEntity extends Model {}

ProductImageEntity.init(
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
    product_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_alt: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: connectMysql,
    modelName: 'ProductImageEntity',
    tableName: 'product_images',
    timestamps: false,
  },
);

ProductEntity.hasMany(ProductImageEntity, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

ProductImageEntity.belongsTo(ProductEntity, {
  foreignKey: 'product_id',
});

module.exports = ProductImageEntity;
