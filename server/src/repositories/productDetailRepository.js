//const { Op } = require('sequelize');
const ProductDetailEntity = require('../entities/productDetailEntity');
const ProductEntity = require('../entities/productEntity');

class ProductDetailRepository {
  async createProductDetail(detailEntity) {
    const newProductDetail = await ProductDetailEntity.create(detailEntity);
    return newProductDetail;
  }

  async getAllProductDetails(productId) {
    const productDetails = await ProductDetailEntity.findAll({
      where: { product_id: +productId },
    });

    return productDetails;
  }

  async getProductDetail({ productId, detailId }) {
    const productDetail = await ProductDetailEntity.findOne({
      where: { id: +detailId, product_id: +productId },
    });

    return productDetail;
  }

  async updateProductDetail(detailEntity) {
    const updatedDetail = await ProductDetailEntity.update(detailEntity, {
      where: { id: +detailEntity.id, product_id: +detailEntity.product_id },
    });

    return updatedDetail;
  }
}

module.exports = new ProductDetailRepository();
