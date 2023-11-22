//const { Op } = require('sequelize');
const ProductSizeEntity = require('../entities/productSizeEntity');

class ProductSizeRepository {
  async createProductSize(sizeEntity) {
    const newProductSize = await ProductSizeEntity.create(sizeEntity);

    return newProductSize;
  }

  async getAllProductSizes(productId) {
    const productSizes = await ProductSizeEntity.findAll({
      where: { product_id: +productId },
    });

    return productSizes;
  }

  async getProductSize({ productId, sizeId }) {
    const productSize = await ProductSizeEntity.findOne({
      where: { id: +sizeId, product_id: +productId },
    });

    return productSize;
  }

  async updateProductSize(sizeEntity) {
    const updatedSize = await ProductSizeEntity.update(sizeEntity, {
      where: { id: +sizeEntity.id, product_id: +sizeEntity.product_id },
    });

    return updatedSize;
  }
}

module.exports = new ProductSizeRepository();
