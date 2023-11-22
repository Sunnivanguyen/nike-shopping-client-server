const { BadRequestException } = require('../exceptions');
const UserService = require('../services/userService');

exports.createUserAvatar = async (req, res) => {
  const userEntity = {
    ...req.user,
    avatar: req.body.avatar,
  };

  try {
    const responseData = await UserService.updateUser(userEntity);
    return res.status(201).json({ status: 'success', data: responseData });
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
