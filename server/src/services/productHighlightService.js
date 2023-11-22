const ProductHighlightRepository = require('../repositories/productHighlightRepository');

class ProductHighlightService {
  async createProductHighlight({ productId, data }) {
    const newProductHighlight =
      await ProductHighlightRepository.createProductHighlight({
        productId,
        data,
      });

    if (!newProductHighlight) {
      const result = {
        statusCode: 400,
        status: 'fail',
        message: 'Bad Request',
      };
      return result;
    }

    const result = {
      statusCode: 201,
      status: 'success',
      data: { newProductHighlight },
    };

    return result;
  }
}

module.exports = new ProductHighlightService();
