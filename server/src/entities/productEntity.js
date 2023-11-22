const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

class ProductEntity extends Model {}

ProductEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    product_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pre_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    product_launch_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    buy_price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sales_volume: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize: connectMysql,
    modelName: 'ProductEntity',
    tableName: 'products',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
);

module.exports = ProductEntity;
