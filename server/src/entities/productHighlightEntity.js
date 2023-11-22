const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

const ProductEntity = require('./productEntity');

class ProductHighlightEntity extends Model {}

ProductHighlightEntity.init(
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
    modelName: 'ProductHighlightEntity',
    tableName: 'product_highlights',
    timestamps: false,
  },
);

ProductEntity.hasMany(ProductHighlightEntity, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

ProductHighlightEntity.belongsTo(ProductEntity, {
  foreignKey: 'product_id',
});

module.exports = ProductHighlightEntity;
