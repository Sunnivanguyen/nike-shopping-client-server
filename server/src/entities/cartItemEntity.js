const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

const UserEntity = require('./userEntity');

class CartItemEntity extends Model {}

CartItemEntity.init(
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
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity_ordered: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_color: {
      type: DataTypes.STRING,
    },
    buy_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    sex: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: connectMysql,
    modelName: 'CartItemEntity',
    tableName: 'cart_items',
    timestamps: false,
  },
);

UserEntity.hasMany(CartItemEntity, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

CartItemEntity.belongsTo(UserEntity, { foreignKey: 'user_id' });

module.exports = CartItemEntity;
