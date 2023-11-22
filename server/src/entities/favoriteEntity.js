const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

const UserEntity = require('./userEntity');

class FavoriteEntity extends Model {}

FavoriteEntity.init(
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
    product_size: {
      type: DataTypes.INTEGER,
    },
    product_color: {
      type: DataTypes.STRING,
    },
    buy_price: {
      type: DataTypes.DECIMAL,
    },
    sex: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: connectMysql,
    modelName: 'FavoriteEntity',
    tableName: 'favorites',
    timestamps: false,
  },
);

UserEntity.hasMany(FavoriteEntity, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

FavoriteEntity.belongsTo(UserEntity, { foreignKey: 'user_id' });

module.exports = FavoriteEntity;
