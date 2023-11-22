const AuthService = require('../services/authService');
const { ConflictException } = require('../exceptions');

exports.userSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const responseData = await AuthService.userSignup({ email, password });

    return res.status(201).json({ status: 'success', data: responseData });
  } catch (error) {
    if (error instanceof ConflictException) {
      return res
        .status(error.statusCode)
        .json({ status: 'fail', message: error.message });
    } else {
      // Generic error handler
      console.error(error); // Log the error for debugging
      return res
        .status(500) // Use a 500 status for server errors
        .json({ status: 'error', message: 'An unexpected error occurred' });
    }
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const responseData = await AuthService.userLogin({ email, password });

    return res.status(200).json({ status: 'success', data: responseData });
  } catch (error) {
    return res
      .status(error.statusCode)
      .json({ status: 'fail', message: error.message });
  }
};

exports.adminSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const responseData = await AuthService.adminSignup({ email, password });

    return res.status(201).json({ status: 'success', data: responseData });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const responseData = await AuthService.adminLogin({ email, password });

    return res.status(200).json({ status: 'success', data: responseData });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: 'fail',
      message: error.message,
    });
  }
};
