const express = require('express');
const multer = require('multer');

const reviewController = require('../controllers/reviewController');

const checkValidUser = require('../middlewares/validation/checkValidUser');
const checkValidProduct = require('../middlewares/validation/checkValidProduct');

const upload = multer();

const router = express.Router();

router.post(
  '/user/:user_id/product/:product_id',
  upload.none(),
  checkValidUser,
  checkValidProduct,
  reviewController.createReview,
);

router.get(
  '/user/:user_id',
  checkValidUser,
  reviewController.getReviewByUserId,
);

router.get(
  '/product/:product_id',
  checkValidProduct,
  reviewController.getReviewByProductId,
);

module.exports = router;
