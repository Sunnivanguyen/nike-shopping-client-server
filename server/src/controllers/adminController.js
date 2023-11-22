const {
  ConflictException,
  BadRequestException,
  NotFoundException,
} = require('../exceptions');
const AdminService = require('../services/adminService');

exports.createAdmin = async (req, res) => {
  const data = req.body;

  try {
    const responseData = await AdminService.createAdmin({ data });
    return res.status(201).json({ status: 'success', data: responseData });
  } catch (error) {
    if (error instanceof ConflictException) {
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

exports.updateAdmin = async (req, res) => {
  const data = req.body;

  const adminEntity = {
    id: +req.params.admin_id,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    phone_number: +data.phone_number,
    avatar: data.avatar,
    status: data.status,
  };

  try {
    const responseData = await AdminService.updateAdmin(adminEntity);

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

exports.getAllAdmins = async (req, res) => {
  try {
    const responseData = await AdminService.getAllAdmins();
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

exports.getAdmin = async (req, res) => {
  const adminId = req.params.admin_id;

  try {
    const responseData = await AdminService.getAdmin(adminId);
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

exports.softDeleteAdmin = async (req, res) => {
  const adminId = req.params.admin_id;

  try {
    const responseData = await AdminService.softDeleteAdmin(adminId);
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

exports.hardDeleteAdmin = async (req, res) => {
  const adminId = req.params.admin_id;

  try {
    const responseData = await AdminService.hardDeleteAdmin(adminId);
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

exports.restoreAdmin = async (req, res) => {
  const adminId = req.params.admin_id;

  try {
    const responseData = await AdminService.restoreAdmin(adminId);
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
