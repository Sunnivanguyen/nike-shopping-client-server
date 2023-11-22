const ProductDetailRepository = require('../repositories/productDetailRepository');

class ProductDetailService {
  async createProductDetail({ productId, data }) {
    const newProductDetail = await ProductDetailRepository.createProductDetail({
      productId,
      data,
    });

    if (!newProductDetail) {
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
      data: { newProductDetail },
    };

    return result;
  }
}

module.exports = new ProductDetailService();
