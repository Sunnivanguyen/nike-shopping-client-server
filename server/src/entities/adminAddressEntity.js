const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

const AdminEntity = require('./adminEntity');

class AdminAddressEntity extends Model {}

AdminAddressEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    admin_id: {
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
    modelName: 'AdminAddressEntity',
    tableName: 'admin_addresses',
    timestamps: false,
  },
);

AdminEntity.hasMany(AdminAddressEntity, {
  foreignKey: 'admin_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

AdminAddressEntity.belongsTo(AdminEntity, { foreignKey: 'admin_id' });

module.exports = AdminAddressEntity;
