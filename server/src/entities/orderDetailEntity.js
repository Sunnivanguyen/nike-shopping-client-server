const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

const ProductEntity = require('./productEntity');

const OrderEntity = require('./orderEntity');

class OrderDetailEntity extends Model {}

OrderDetailEntity.init(
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
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity_ordered: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_size: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: connectMysql,
    modelName: 'OrderDetailEntity',
    tableName: 'order_details',
    timestamps: false,
  },
);

OrderEntity.hasMany(OrderDetailEntity, {
  foreignKey: 'order_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

OrderDetailEntity.belongsTo(OrderEntity, {
  foreignKey: 'order_id',
});

ProductEntity.hasMany(OrderDetailEntity, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

OrderDetailEntity.belongsTo(ProductEntity, {
  foreignKey: 'product_id',
});

module.exports = OrderDetailEntity;
