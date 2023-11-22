const OrderPaymentService = require('../services/orderPaymentService');

const { BadRequestException } = require('../exceptions');

exports.createOrderPayment = async (req, res) => {
  const data = {
    order_id: req.order.id,
    user_payment_id: +req.body.user_payment_id,
  };

  try {
    const responseData = await OrderPaymentService.createOrderPayment(data);
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

exports.getOrderPayment = async (req, res) => {
  const orderPaymentId = req.orderPayment.id;
  try {
    const responseData =
      await OrderPaymentService.getOrderPayment(orderPaymentId);
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
