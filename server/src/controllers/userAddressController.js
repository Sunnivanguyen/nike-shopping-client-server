const { BadRequestException } = require('../exceptions');
const UserAddressService = require('../services/userAddressService');

exports.createUserAddress = async (req, res) => {
  const userId = req.params.user_id;
  const data = req.body;

  try {
    const responseData = await UserAddressService.createUserAddress({
      userId,
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

exports.getAllUserAddresses = async (req, res) => {
  const userId = req.params.user_id;

  try {
    const responseData = await UserAddressService.getAllUserAddresses(userId);
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

exports.updateUserAddress = async (req, res, next) => {
  const userId = req.params.user_id;
  const addressId = req.params.address_id;
  const data = req.body;

  const userAddressEntity = {
    id: +addressId,
    user_id: +userId,
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
      await UserAddressService.updateUserAddress(userAddressEntity);
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

exports.getCurrentUserAddress = async (req, res, next) => {
  const addressId = req.params.address_id;

  try {
    const responseData =
      await UserAddressService.getCurrentUserAddress(addressId);
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

exports.deleteUserAddress = async (req, res, next) => {
  const addressId = req.params.address_id;

  try {
    const responseData = await UserAddressService.deleteUserAddress(addressId);

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
