const ProductReviewEntity = require('../entities/productReviewEntity');

class ReviewRepository {
  async createReview(data) {
    const newReview = await ProductReviewEntity.create(data);
    return newReview;
  }

  async updateProductReview(data) {
    const updatedReview = await ProductReviewEntity.update(data, {
      where: { id: +data.id },
    });
    return updatedReview;
  }

  async getAllProductReviews(productId) {
    const reviews = await ProductReviewEntity.findAll({
      where: { product_id: +productId },
    });
    return reviews;
  }

  async getProductReview(reviewId) {
    const review = await ProductReviewEntity.findOne({
      where: { id: +reviewId },
    });

    return review;
  }

  // async getReviewByProductId(productId) {
  //   const reviews = await ProductReviewEntity.findAll({
  //     where: { product_id: +productId },
  //   });
  //   return reviews;
  // }

  // async getReviewByUserId(userId) {
  //   const reviews = await ProductReviewEntity.findAll({
  //     where: { user_id: +userId },
  //   });
  //   return reviews;
  // }

  async deleteProductReview(data) {
    const deletedReview = await ProductReviewEntity.destroy({
      where: { id: +data },
    });
    return deletedReview;
  }
}

module.exports = new ReviewRepository();
