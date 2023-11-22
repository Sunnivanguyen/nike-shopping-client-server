const UserEntity = require('../../entities/userEntity');
const AdminEnitity = require('../../entities/adminEntity');
const ProductEnitity = require('../../entities/productEntity');
const OrderEntity = require('../../entities/orderEntity');
const CartItemEntity = require('../../entities/cartItemEntity');
const UserAddressEnitity = require('../../entities/userAddressEntity');
const AdminAddressEntity = require('../../entities/adminAddressEntity');
const ProductReviewEntity = require('../../entities/productReviewEntity');
const { Op } = require('sequelize');
const PaymentMethodEntity = require('../../entities/paymentMethodEntity');
const OrderPaymentEntity = require('../../entities/orderPaymentEntity');

exports.checkValidUser = async (req, res, next) => {
  const userId = req.params.user_id ? req.params.user_id : req.body.user_id;
  try {
    const user = await UserEntity.findByPk(+userId);

    if (user) {
      req.user = user.dataValues;
      return next();
    }

    return res.status(404).json({
      status: 'fail',
      message: 'User Not Found by Id',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.checkValidProduct = async (req, res, next) => {
  const productId = req.params.product_id
    ? req.params.product_id
    : req.body.product_id;

  try {
    const product = await ProductEnitity.findByPk(+productId);

    if (product) {
      req.product = product.dataValues;
      return next();
    }

    return res.status(404).json({
      status: 'fail',
      message: 'Product Not Found by Id',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.checkValidProductCode = async (req, res, next) => {
  const productCode = req.params.product_code
    ? req.params.product_code
    : req.body.product_code;

  try {
    const product = await ProductEnitity.findOne({
      where: {
        product_code: productCode,
      },
    });

    if (!product) {
      return next();
    } else {
      return res.status(400).json({
        status: 'fail',
        message: 'Product Code Already Exist',
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.checkExistProductCode = async (req, res, next) => {
  const productCode = req.params.product_code
    ? req.params.product_code
    : req.body.product_code;

  try {
    const product = await ProductEnitity.findOne({
      where: {
        product_code: productCode,
        id: { [Op.ne]: +req.params.product_id },
      },
    });

    if (!product) {
      return next();
    } else {
      return res.status(400).json({
        status: 'fail',
        message: 'Product Code Already Exist',
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.checkValidOrder = async (req, res, next) => {
  try {
    const order = await OrderEntity.findByPk(+req.params.order_id);

    if (order) {
      req.order = order.dataValues;
      return next();
    }
    return res.status(404).json({
      status: 'fail',
      message: 'Order Not Found by Id',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.checkValidCartItem = async (req, res, next) => {
  try {
    const cartItem = await CartItemEntity.findByPk(+req.params.cart_item_id);

    if (cartItem) {
      req.cartItem = cartItem.dataValues;
      return next();
    }

    return res.status(404).json({
      status: 'fail',
      message: 'Cart Item Not Found by Id',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.checkValidAdmin = async (req, res, next) => {
  try {
    const admin = await AdminEnitity.findByPk(+req.params.admin_id);

    if (admin) {
      req.admin = admin.dataValues;
      return next();
    }

    return res.status(404).json({
      status: 'fail',
      message: 'Admin Not Found by Id',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.checkValidUserAddress = async (req, res, next) => {
  try {
    const address = await UserAddressEnitity.findByPk(+req.params.address_id);

    if (address) {
      req.address = address.dataValues;
      return next();
    }

    return res.status(404).json({
      status: 'fail',
      message: 'Address Not Found by Id',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.checkValidAdminAddress = async (req, res, next) => {
  try {
    const address = await AdminAddressEntity.findByPk(+req.params.address_id);

    if (address) {
      req.address = address.dataValues;
      return next();
    }

    return res.status(404).json({
      status: 'fail',
      message: 'Address Not Found by Id',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.checkValidUserCart = async (req, res, next) => {
  try {
    const userCarts = await CartItemEntity.findAll({
      where: { user_id: +req.params.user_id },
    });

    if (userCarts) {
      req.userCarts = userCarts;
      return next();
    }

    console.log(userCarts);

    return res.status(404).json({
      status: 'fail',
      message: 'User Cart Have No Items',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.checkValidReview = async (req, res, next) => {
  try {
    const review = await ProductReviewEntity.findByPk(+req.params.review_id);

    if (review) {
      req.review = review;
      return next();
    }

    console.log(review, 'review');

    return res.status(404).json({
      status: 'fail',
      message: 'Product Review Not Found',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.checkValidPaymentMethod = async (req, res, next) => {
  const paymentMethodId = req.params.payment_method_id
    ? req.params.payment_method_id
    : req.body.payment_method_id;
  try {
    const paymentMethod = await PaymentMethodEntity.findByPk(+paymentMethodId);

    if (paymentMethod) {
      req.paymentMethod = paymentMethod.dataValues;
      return next();
    }

    return res.status(404).json({
      status: 'fail',
      message: 'User Not Found by Id',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.checkValidOrderPayment = async (req, res, next) => {
  const orderPaymentId = req.params.order_payment_id
    ? req.params.order_payment_id
    : req.body.order_payment_id;
  try {
    const orderPayment = await OrderPaymentEntity.findByPk(+orderPaymentId);

    if (orderPayment) {
      req.orderPayment = orderPayment.dataValues;
      return next();
    }

    return res.status(404).json({
      status: 'fail',
      message: 'User Not Found by Id',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};
