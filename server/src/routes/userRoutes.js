const express = require('express');
const multer = require('multer');

// const checkAuthentication = require('../middlewares/auth/checkAuth');

const userController = require('../controllers/userController');
const userAddressController = require('../controllers/userAddressController');
const userAvatarController = require('../controllers/userAvatarController');
const cartItemController = require('../controllers/cartItemController');
const orderController = require('../controllers/orderController');
const userPaymentController = require('../controllers/userPaymentController');
const orderPaymentController = require('../controllers/orderPaymentController');

const {
  uploadPhoto,
  updateUserPhoto,
  createUserPhoto,
} = require('../middlewares/uploads/uploadUserPhoto');

const upload = multer();

const {
  checkValidUser,
  checkValidUserAddress,
  checkValidCartItem,
  checkValidProduct,
  checkValidUserCart,
  checkValidOrder,
  checkValidPaymentMethod,
  checkValidOrderPayment,
} = require('../middlewares/validation/dataValidator');

const router = express.Router();
//___________________ USER ___________________
// Create User
router.post('/', uploadPhoto, createUserPhoto, userController.createUser);

// Get All User
router.get('/', userController.getAllUsers);

//Get User
router.get('/:user_id', checkValidUser, userController.getUser);

//Update User
router.put(
  '/:user_id',
  checkValidUser,
  uploadPhoto,
  updateUserPhoto,
  userController.updateUser,
);

//Soft Delete User
router.delete(
  '/:user_id/soft-delete',
  checkValidUser,
  userController.softDeleteUser,
);

//Hard Delete Use
router.delete(
  '/:user_id/hard-delete',
  checkValidUser,
  userController.hardDeleteUser,
);

//Restore User
router.post('/:user_id/restore', userController.restoreUser);

//___________________ USER ADDRESS ___________________
//Create User Address
router.post(
  '/:user_id/address',
  upload.none(),
  checkValidUser,
  userAddressController.createUserAddress,
);

//Get All User Address
router.get(
  '/:user_id/address',
  checkValidUser,
  userAddressController.getAllUserAddresses,
);

//Get User Address
router.get(
  '/:user_id/address/:address_id',
  checkValidUser,
  checkValidUserAddress,
  userAddressController.getCurrentUserAddress,
);

//Update User Address
router.put(
  '/:user_id/address/:address_id',
  checkValidUser,
  checkValidUserAddress,
  userAddressController.updateUserAddress,
);

//Delete User Address
router.delete(
  '/:user_id/address/:address_id',
  checkValidUser,
  checkValidUserAddress,
  userAddressController.deleteUserAddress,
);

// ___________________ USER CART _________________

//Create Cart Item
router.post(
  '/:user_id/carts',
  upload.none(),
  checkValidUser,
  checkValidProduct,
  cartItemController.createCartItem,
);

//Update Cart Item
router.put(
  '/:user_id/carts/:cart_item_id',
  upload.none(),
  checkValidUser,
  checkValidCartItem,
  cartItemController.updateCartItem,
);

//Get All Cart Items of a person
router.get(
  '/:user_id/carts',
  checkValidUser,
  cartItemController.getAllCartItems,
);

//Get Cart Item
router.get(
  '/:user_id/carts/:cart_item_id',
  checkValidCartItem,
  cartItemController.getCartItem,
);

//Delete Cart Item
router.delete(
  '/:user_id/carts/:cart_item_id',
  checkValidCartItem,
  cartItemController.deleteCartItem,
);

//___________________USER ORDERS___________________

router.post(
  '/:user_id/orders',
  upload.none(),
  checkValidUser,
  checkValidUserCart,
  orderController.createOrder,
);

router.get(
  '/:user_id/orders',
  checkValidUser,
  orderController.getAllUserOrders,
);

router.get(
  '/:user_id/orders/:order_id',
  checkValidUser,
  checkValidOrder,
  orderController.getUserOrder,
);

router.put(
  '/:user_id/orders/:order_id',
  upload.none(),
  checkValidUser,
  checkValidOrder,
  orderController.updateOrder,
);

router.delete(
  '/:user_id/orders/:order_id',
  checkValidOrder,
  orderController.deleteOrder,
);

//____________________ USER PAYMENT _____________________

router.post(
  '/:user_id/payments',
  upload.none(),
  checkValidUser,
  checkValidPaymentMethod,
  userPaymentController.createUserPayment,
);

router.get(
  '/:user_id/payments',
  checkValidUser,
  userPaymentController.getAllUserPayments,
);
///:user_id/payments/:payment_id

//____________________ ORDER PAYMENT _____________________

router.post(
  '/:user_id/orders/:order_id/order-payment',
  upload.none(),
  checkValidUser,
  checkValidOrder,
  orderPaymentController.createOrderPayment,
);

router.get(
  '/:user_id/orders/:order_id/order-payment/:order_payment_id',
  checkValidUser,
  checkValidOrder,
  checkValidOrderPayment,
  orderPaymentController.getOrderPayment,
);
module.exports = router;
