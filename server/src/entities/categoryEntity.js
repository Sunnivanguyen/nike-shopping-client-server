const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

const ProductEntity = require('./productEntity');

class CategoryEntity extends Model {}

CategoryEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: connectMysql,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false,
  },
);

CategoryEntity.hasMany(ProductEntity, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

ProductEntity.belongsTo(CategoryEntity, {
  foreignKey: 'category_id',
});

module.exports = CategoryEntity;
