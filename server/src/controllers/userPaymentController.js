const UserPaymentService = require('../services/userPaymentService');

const { BadRequestException } = require('../exceptions');

exports.createUserPayment = async (req, res) => {
  const data = {
    user_id: req.user.id,
    payment_method_id: req.paymentMethod.id,
    amount: req.body.amount,
    card_type: req.body.card_type,
    name_on_card: req.body.name_on_card,
    card_number: req.body.card_number,
    expire_date: req.body.expire_date,
    cvc: +req.body.cvc,
    is_default: +req.body.is_default,
  };

  try {
    const responseData = await UserPaymentService.createUserPayment(data);
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

exports.getAllUserPayments = async (req, res) => {
  try {
    const responseData = await UserPaymentService.getAllUserPayments();
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
