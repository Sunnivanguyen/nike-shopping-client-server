const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

class PromotionEntity extends Model {}

PromotionEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    start_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    end_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    percent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: connectMysql,
    modelName: 'PromotionEntity',
    tableName: 'promotions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

module.exports = PromotionEntity;
