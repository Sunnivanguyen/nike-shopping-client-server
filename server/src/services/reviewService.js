const ReviewRepository = require('../repositories/reviewRepository');
const { BadRequestException, NotFoundException } = require('../exceptions');

class ReviewService {
  async createProductReview(data) {
    try {
      const newReview = await ReviewRepository.createReview(data);

      if (!newReview) {
        throw new BadRequestException(
          'Bad Request',
          400,
          'Something wrong with creating order',
        );
      }

      const responseData = {
        newReview,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getAllProductReviews(productId) {
    try {
      const reviews = await ReviewRepository.getAllProductReviews(productId);

      if (!reviews) {
        throw new NotFoundException(
          'Not Found',
          404,
          'Something wrong with getting reviews',
        );
      }
      const responseData = {
        reviews,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getProductReview(reviewId) {
    try {
      const review = await ReviewRepository.getProductReview(reviewId);

      if (!review) {
        throw new NotFoundException(
          'Not Found',
          404,
          'Something wrong with getting review',
        );
      }
      const responseData = {
        review,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductReview(data) {
    try {
      const deletedReview = await ReviewRepository.deleteProductReview(data);
      if (deletedReview !== 1) {
        throw new BadRequestException(
          'Bad Request',
          400,
          'Something wrong with deleting review',
        );
      }
      const responseData = {
        deletedReview,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async updateProductReview(data) {
    try {
      const updatedReview = await ReviewRepository.updateProductReview(data);
      console.log(updatedReview, 'updatedReview');
      if (updatedReview[0] !== 1) {
        throw new BadRequestException(
          'Bad Request',
          400,
          'Something wrong with updating review',
        );
      }
      const responseData = {
        updatedReview,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getReviewByProductId(productId) {
    try {
      const reviews = await ReviewRepository.getReviewByProductId(productId);
      const result = {
        statusCode: 201,
        status: 'success',
        data: { reviews },
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

  async getReviewByUserId(userId) {
    try {
      const reviews = await ReviewRepository.getReviewByUserId(userId);
      const result = {
        statusCode: 201,
        status: 'success',
        data: { reviews },
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

module.exports = new ReviewService();
