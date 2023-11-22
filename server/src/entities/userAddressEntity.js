const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

const UserEntity = require('./userEntity');

class UserAddressEntity extends Model {}

UserAddressEntity.init(
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
    address_line_1: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    address_line_2: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    region: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: connectMysql,
    modelName: 'UserAddressEntity',
    tableName: 'user_addresses',
    timestamps: false,
  },
);

UserEntity.hasMany(UserAddressEntity, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

UserAddressEntity.belongsTo(UserEntity, { foreignKey: 'user_id' });

module.exports = UserAddressEntity;
