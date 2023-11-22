const ReviewService = require('../services/reviewService');
const { BadRequestException, NotFoundException } = require('../exceptions');

exports.createProductReview = async (req, res) => {
  const data = {
    rating: +req.body.rating,
    comment: req.body.comment,
    user_id: req.user.id,
    product_id: req.product.id,
  };

  try {
    const responseData = await ReviewService.createProductReview(data);
    return res.status(201).json({
      status: 'success',
      data: responseData,
    });
  } catch (error) {
    if (error instanceof BadRequestException) {
      return res
        .status(error.statusCode)
        .json({ status: 'fail', message: error.message, error: error.error });
    } else {
      // Generic error handler
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};

exports.getAllProductReviews = async (req, res) => {
  const productId = req.product.id;
  try {
    const responseData = await ReviewService.getAllProductReviews(productId);
    return res.status(200).json({
      status: 'success',
      data: responseData,
    });
  } catch (error) {
    if (error instanceof NotFoundException) {
      return res
        .status(error.statusCode)
        .json({ status: 'fail', message: error.message, error: error.error });
    } else {
      // Generic error handler
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};

exports.getProductReview = async (req, res) => {
  const reviewId = req.params.review_id;
  console.log(reviewId);
  try {
    const responseData = await ReviewService.getProductReview(reviewId);
    return res.status(200).json({
      status: 'success',
      data: responseData,
    });
  } catch (error) {
    if (error instanceof NotFoundException) {
      return res
        .status(error.statusCode)
        .json({ status: 'fail', message: error.message, error: error.error });
    } else {
      // Generic error handler
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};

exports.updateProductReview = async (req, res) => {
  const data = {
    rating: +req.body.rating,
    comment: req.body.comment,
    user_id: req.user.id,
    product_id: req.product.id,
    id: req.review.id,
  };

  console.log(data, 'data');

  try {
    const responseData = await ReviewService.updateProductReview(data);
    return res.status(201).json({
      status: 'success',
      data: responseData,
    });
  } catch (error) {
    if (error instanceof BadRequestException) {
      return res
        .status(error.statusCode)
        .json({ status: 'fail', message: error.message, error: error.error });
    } else {
      // Generic error handler
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};

exports.deleteProductReview = async (req, res) => {
  const reviewId = req.review.id;
  try {
    const responseData = await ReviewService.deleteProductReview(reviewId);
    return res.status(200).json({
      status: 'success',
      data: responseData,
    });
  } catch (error) {
    if (error instanceof BadRequestException) {
      return res
        .status(error.statusCode)
        .json({ status: 'fail', message: error.message, error: error.error });
    } else {
      // Generic error handler
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  }
};

// exports.getReviewByProductId = async (req, res, next) => {
//   const productId = req.params.product_id;
//   const result = await ReviewService.getReviewByProductId(productId);

//   req.result = result;

//   next();
// };

// exports.getReviewByUserId = async (req, res, next) => {
//   const userId = req.params.user_id;
//   const result = await ReviewService.getReviewByUserId(userId);

//   req.result = result;

//   next();
// };
