const { BadRequestException } = require('../exceptions');
const AdminService = require('../services/adminService');

exports.createAdminAvatar = async (req, res) => {
  const adminEntity = {
    ...req.admin,
    avatar: req.body.avatar,
  };

  console.log(adminEntity);

  try {
    const responseData = await AdminService.updateAdmin(adminEntity);
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
