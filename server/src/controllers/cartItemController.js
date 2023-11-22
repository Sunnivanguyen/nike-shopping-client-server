const CartItemService = require('../services/cartItemService');
const { BadRequestException } = require('../exceptions');

exports.createCartItem = async (req, res) => {
  const data = {
    ...req.body,
    ...req.product,
    product_id: req.product.id,
    product_size: +req.body.product_size,
    quantity_ordered: +req.body.quantity_ordered,
    ...req.user,
    user_id: req.user.id,
  };

  try {
    const responseData = await CartItemService.createCartItem(data);
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

exports.updateCartItem = async (req, res, next) => {
  const data = {
    ...req.cartItem,
    ...req.body,
    product_id: +req.cartItem.product_id,
    quantity_ordered: +req.body.quantity_ordered,
  };

  try {
    const responseData = await CartItemService.updateCartItem(data);
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

exports.getAllCartItems = async (req, res, next) => {
  const userId = req.params.user_id;
  try {
    const responseData = await CartItemService.getAllCartItems(userId);
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

exports.getCartItem = async (req, res, next) => {
  const cartItemId = req.cartItem.id;

  try {
    const responseData = await CartItemService.getCartItem(cartItemId);
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

exports.deleteCartItem = async (req, res, next) => {
  const cartItemId = req.cartItem.id;

  try {
    const responseData = await CartItemService.deleteCartItem(cartItemId);

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
