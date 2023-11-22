const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

const UserEntity = require('./userEntity');

const OrderPaymentEntity = require('./orderPaymentEntity');

class UserPaymentEntity extends Model {}

UserPaymentEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_method_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    card_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name_on_card: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    card_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expire_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cvc: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: connectMysql,
    modelName: 'UserPaymentEntity',
    tableName: 'user_payments',
    timestamps: false,
  },
);

UserEntity.hasMany(UserPaymentEntity, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

UserPaymentEntity.belongsTo(UserEntity, { foreignKey: 'user_id' });

UserPaymentEntity.hasMany(OrderPaymentEntity, {
  foreignKey: 'user_payment_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

OrderPaymentEntity.belongsTo(UserPaymentEntity, {
  foreignKey: 'user_payment_id',
});

module.exports = UserPaymentEntity;
