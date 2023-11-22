const AdminAddressService = require('../services/adminAddressService');
const { BadRequestException } = require('../exceptions');
exports.createAdminAddress = async (req, res) => {
  const adminId = req.params.admin_id;
  const data = req.body;

  try {
    const responseData = await AdminAddressService.createAdminAddress({
      adminId,
      data,
    });
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

exports.getAllAdminAddresses = async (req, res) => {
  const adminId = req.params.admin_id;

  try {
    const responseData =
      await AdminAddressService.getAllAdminAddresses(adminId);
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

exports.updateAdminAddress = async (req, res) => {
  const adminId = req.params.admin_id;
  const addressId = req.params.address_id;
  const data = req.body;

  const userAddressEntity = {
    id: +addressId,
    admin_id: +adminId,
    address_line_1: data.address_line_1,
    address_line_2: data.address_line_2,
    city: data.city,
    region: data.region,
    country: data.country,
    postal_code: data.postal_code,
    logitude: data.logitude,
    latitude: data.latitude,
    is_default: +data.is_default,
  };
  try {
    const responseData =
      await AdminAddressService.updateAdminAddress(userAddressEntity);
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

exports.getCurrentAdminAddress = async (req, res) => {
  const addressId = req.params.address_id;

  try {
    const responseData =
      await AdminAddressService.getCurrentAdminAddress(addressId);
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

exports.deleteAdminAddress = async (req, res) => {
  const addressId = req.params.address_id;

  try {
    const responseData =
      await AdminAddressService.deleteAdminAddress(addressId);

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
