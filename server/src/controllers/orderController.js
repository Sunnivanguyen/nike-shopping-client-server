const OrderService = require('../services/orderService');

const { BadRequestException, NotFoundException } = require('../exceptions');

exports.createOrder = async (req, res) => {
  const data = {
    ...req.body,
    ...req.user,
    carts: req.userCarts,
    user_id: req.user.id,
  };

  try {
    const responseData = await OrderService.createOrder(data);
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

exports.getAllUserOrders = async (req, res) => {
  const userId = req.user.id;
  try {
    const responseData = await OrderService.getAllUserOrders(userId);
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

exports.getUserOrder = async (req, res) => {
  const orderId = req.order.id;
  try {
    const responseData = await OrderService.getUserOrder(orderId);
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

exports.updateOrder = async (req, res) => {
  const data = { ...req.order, ...req.body };
  console.log(data, 'DATA');

  try {
    const responseData = await OrderService.updateOrder(data);
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

exports.deleteOrder = async (req, res) => {
  const orderId = req.order.id;

  try {
    const responseData = await OrderService.deleteOrder(orderId);

    return res.status(200).json({ status: 'success', data: responseData });
  } catch (error) {
    if (error instanceof BadRequestException) {
      return res
        .status(error.statusCode)
        .json({ status: 'fail', message: error.message });
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
