const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

class OrderPaymentEntity extends Model {}

OrderPaymentEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    user_payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: connectMysql,
    modelName: 'OrderPaymentEntity',
    tableName: 'order_payments',
    timestamps: false,
  },
);

module.exports = OrderPaymentEntity;
