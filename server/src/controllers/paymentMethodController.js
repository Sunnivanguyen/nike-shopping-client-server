const PaymentMethodService = require('../services/paymentMethodService');

const { BadRequestException } = require('../exceptions');

exports.createPaymentMethod = async (req, res) => {
  const data = {
    method: +req.body.method,
  };

  try {
    const responseData = await PaymentMethodService.createPaymentMethod(data);
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

exports.getAllPaymentMethods = async (req, res) => {
  try {
    const responseData = await PaymentMethodService.getAllPaymentMethods();
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
