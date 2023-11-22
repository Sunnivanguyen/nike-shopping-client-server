const ProductSizeRepository = require('../repositories/productSizeRepository');

class ProductSizeService {
  async createProductSize({ productId, data }) {
    try {
      const newProductSize = await ProductSizeRepository.createProductSize({
        productId,
        data,
      });

      const result = {
        statusCode: 201,
        status: 'success',
        data: { newProductSize },
      };

      return result;
    } catch (error) {
      const result = {
        statusCode: 400,
        status: 'fail',
        message: error.message,
      };
      return result;
    }
  }
}

module.exports = new ProductSizeService();
