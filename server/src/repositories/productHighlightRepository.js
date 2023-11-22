//const { Op } = require('sequelize');
const ProductHighlightEntity = require('../entities/productHighlightEntity');

class ProductHighlightRepository {
  async createProductHighlight(productEntity) {
    const newProductHighlight =
      await ProductHighlightEntity.create(productEntity);

    return newProductHighlight;
  }

  async getAllProductHighlights(productId) {
    const productHighlights = await ProductHighlightEntity.findAll({
      where: { product_id: +productId },
    });

    return productHighlights;
  }

  async getProductHighlight({ highlightId, productId }) {
    const productHighlight = await ProductHighlightEntity.findOne({
      where: { id: +highlightId, product_id: +productId },
    });

    return productHighlight;
  }

  async updateProductHighlight(highlightEntity) {
    const updatedHighlight = await ProductHighlightEntity.update(
      highlightEntity,
      {
        where: {
          id: +highlightEntity.id,
          product_id: +highlightEntity.product_id,
        },
      },
    );

    return updatedHighlight;
  }
}

module.exports = new ProductHighlightRepository();
