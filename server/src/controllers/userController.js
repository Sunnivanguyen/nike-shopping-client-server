const {
  ConflictException,
  BadRequestException,
  NotFoundException,
} = require('../exceptions');
const UserService = require('../services/userService');

exports.createUser = async (req, res) => {
  const data = req.body;

  try {
    const responseData = await UserService.createUser({ data });
    return res.status(201).json({ status: 'success', data: responseData });
  } catch (error) {
    if (error instanceof ConflictException) {
      return res
        .status(error.statusCode)
        .json({ status: 'fail', message: error.message, error: error.error });
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

exports.updateUser = async (req, res) => {
  const data = req.body;

  const userEntity = {
    id: +req.params.user_id,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    phone_number: +data.phone_number,
    avatar: data.avatar,
    status: data.status,
  };

  try {
    const responseData = await UserService.updateUser(userEntity);

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

exports.getAllUsers = async (req, res) => {
  try {
    const responseData = await UserService.getAllUsers();
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

exports.getUser = async (req, res) => {
  const userId = req.params.user_id;

  try {
    const responseData = await UserService.getUser(userId);
    return res.status(200).json({ status: 'success', data: responseData });
  } catch (error) {
    if (error instanceof NotFoundException) {
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

exports.softDeleteUser = async (req, res) => {
  const userId = req.params.user_id;

  try {
    const responseData = await UserService.softDeleteUser(userId);
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

exports.hardDeleteUser = async (req, res) => {
  const userId = req.params.user_id;
  try {
    const responseData = await UserService.hardDeleteUser(userId);
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

exports.restoreUser = async (req, res) => {
  const userId = req.params.user_id;
  try {
    const responseData = await UserService.restoreUser(userId);
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
