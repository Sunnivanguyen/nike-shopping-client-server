const ProductImageRepository = require('../repositories/productImageRepository');

class ProductImageService {
  async createProductImage({ productId, data }) {
    const newProductImage = await ProductImageRepository.createProductImage({
      productId,
      data,
    });

    if (!newProductImage) {
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
      data: { newProductImage },
    };

    return result;
  }
}

module.exports = new ProductImageService();
