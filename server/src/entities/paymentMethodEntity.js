const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

const UserPaymentEntity = require('./userPaymentEntity');

class PaymentMethodEntity extends Model {}

PaymentMethodEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    method: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: connectMysql,
    modelName: 'PaymentMethodEntity',
    tableName: 'payment_methods',
    timestamps: false,
  },
);

PaymentMethodEntity.hasMany(UserPaymentEntity, {
  foreignKey: 'payment_method_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

UserPaymentEntity.belongsTo(PaymentMethodEntity, {
  foreignKey: 'payment_method_id',
});

module.exports = PaymentMethodEntity;
