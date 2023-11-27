const express = require('express');
const multer = require('multer');

const productController = require('../controllers/productController');
const reviewController = require('../controllers/reviewController');

const {
  createProductPhotos,
  updateProductPhotos,
} = require('../middlewares/uploads/uploadProductPhoto');

const {
  checkValidProduct,
  checkValidProductCode,
  checkExistProductCode,
  checkValidUser,
  checkValidReview,
} = require('../middlewares/validation/dataValidator');

const upload = multer();

const router = express.Router();

//Create Product
router.post(
  '/',
  upload.any(),
  checkValidProductCode,
  createProductPhotos,
  productController.createProduct,
);

//Get All Products
router.get('/', productController.getAllProducts);

//Get New Arrival Products
router.get('/new-arrivals', productController.getNewArrivalProducts);

//Get BestSeller Products
router.get('/best-sellers', productController.getBestSellerProducts);

//Get Unique Products
router.get('/unique', productController.getAllUniqueProducts);

//Get Product
router.get('/:product_id', productController.getProduct);

//Get Product by Code
router.get(
  '/product-code/:product_code',
  productController.getProductByProductCode,
);

//Update Product
router.put(
  '/:product_id',
  upload.any(),
  checkValidProduct,
  checkExistProductCode,
  updateProductPhotos,
  productController.updateProduct,
);

router.delete(
  '/:product_id/soft-delete',
  checkValidProduct,
  productController.softDeleteProduct,
);

router.delete(
  '/:product_id/hard-delete',
  checkValidProduct,
  productController.hardDeleteProduct,
);

router.post('/:product_id/restore', productController.restoreProduct);

// router.get(
//   '/:product_id/delete',
//   upload.none(),
//   checkValidProduct,
//   productController.getAllDeletedProducts,
// );

// router.get(
//   '/:product_id/delete',
//   upload.none(),
//   checkValidProduct,
//   productController.getDeletedProduct,
// );

//___________________ PRODUCT REVIEW ___________________

//Create Product Review
router.post(
  '/:product_id/users/:user_id/reviews',
  upload.none(),
  checkValidProduct,
  checkValidUser,
  reviewController.createProductReview,
);

//Update Product Review
router.put(
  '/:product_id/users/:user_id/reviews/:review_id',
  upload.none(),
  checkValidProduct,
  checkValidUser,
  checkValidReview,
  reviewController.updateProductReview,
);

//Get All Product Reviews
router.get(
  '/:product_id/users/:user_id/reviews',
  checkValidProduct,
  checkValidUser,
  reviewController.getAllProductReviews,
);

router.get(
  '/:product_id/users/:user_id/reviews/:review_id',
  checkValidProduct,
  checkValidUser,
  checkValidReview,
  reviewController.getProductReview,
);

//Delete Product Review
router.delete(
  '/:product_id/users/:user_id/reviews/:review_id',
  checkValidProduct,
  checkValidUser,
  checkValidReview,
  reviewController.deleteProductReview,
);

module.exports = router;
