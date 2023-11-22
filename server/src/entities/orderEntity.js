const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

const UserEntity = require('./userEntity');

const OrderPayemtEntity = require('./orderPaymentEntity');

class OrderEntity extends Model {}

OrderEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    order_code: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    delivery_fee: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment_date: {
      type: DataTypes.DATE(6),
      allowNull: false,
    },
  },
  {
    sequelize: connectMysql,
    modelName: 'OrderEntity',
    tableName: 'orders',
    timestamps: true,
    createdAt: 'ordered_at',
    updatedAt: 'updated_at',
  },
);

UserEntity.hasMany(OrderEntity, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

OrderEntity.belongsTo(UserEntity, { foreignKey: 'user_id' });

OrderEntity.hasOne(OrderPayemtEntity, {
  foreignKey: 'order_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

OrderPayemtEntity.belongsTo(OrderEntity, { foreignKey: 'order_id' });

module.exports = OrderEntity;
