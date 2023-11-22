const SizeService = require('../services/sizeService');

exports.createSize = async (req, res, next) => {
  const size = req.body.size;

  try {
    const responseData = await SizeService.createSize({ size });
    return res.status(201).json({ status: 'success', data: responseData });
  } catch (error) {
    if (error instanceof ConflictException) {
      return res
        .status(error.statusCode)
        .json({ status: 'fail', message: error.message, error: error.name });
    } else {
      // Generic error handler
      console.error(error); // Log the error for debugging
      return res
        .status(500) // Use a 500 status for server errors
        .json({
          status: 'error',
          message: 'An unexpected error occurred',
          error: error.message,
        });
    }
  }
};

exports.getAllSizes = async (req, res) => {
  try {
    const responseData = await SizeService.getAllSizes();
    return res.status(200).json({ status: 'success', data: responseData });
  } catch (error) {
    if (error instanceof BadRequestException) {
      return res
        .status(error.statusCode)
        .json({ status: 'fail', message: error.message, error: error.name });
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
