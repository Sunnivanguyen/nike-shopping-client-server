const { DataTypes, Model } = require('sequelize');

const connectMysql = require('../configs/db.config');

const ProductEntity = require('./productEntity');

const UserEntity = require('./userEntity');

class ProductReviewEntity extends Model {}

ProductReviewEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: connectMysql,
    modelName: 'ProductReviewEntity',
    tableName: 'product_reviews',
    timestamps: false,
  },
);

UserEntity.hasMany(ProductReviewEntity, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

ProductReviewEntity.belongsTo(UserEntity, {
  foreignKey: 'user_id',
});

ProductEntity.hasMany(ProductReviewEntity, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

ProductReviewEntity.belongsTo(ProductEntity, {
  foreignKey: 'product_id',
});

module.exports = ProductReviewEntity;
