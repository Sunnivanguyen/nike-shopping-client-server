const { Op } = require('sequelize');
const ProductImageEntity = require('../entities/productImageEntity');

class ProductImageRepository {
  async createProductImage(imageEntity) {
    const newProductImage = await ProductImageEntity.create(imageEntity);

    return newProductImage;
  }

  async getAllProductImages(productId) {
    const productImages = await ProductImageEntity.findAll({
      where: { product_id: +productId },
    });

    return productImages;
  }

  async getProductImage({ productId, imageId }) {
    const productImage = await ProductImageEntity.findOne({
      where: { id: +imageId, product_id: +productId },
    });

    return productImage;
  }

  async updateProductImage(imageEntity) {
    const updatedImage = await ProductImageEntity.update(imageEntity, {
      where: { id: +imageEntity.id, product_id: +imageEntity.product_id },
    });

    return updatedImage;
  }

  async getProductImageByPreCode(preCode) {
    const images = await ProductImageEntity.findAll({
      where: { image_alt: 2, product_code: { [Op.startsWith]: preCode } },
    });

    return images;
  }
}

module.exports = new ProductImageRepository();
