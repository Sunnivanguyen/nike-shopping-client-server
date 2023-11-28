const ProductService = require('../services/productService');
const { NotFoundException, BadRequestException } = require('../exceptions');

exports.createProduct = async (req, res) => {
  const data = { ...req.body };

  try {
    const responseData = await ProductService.createProduct({ data });
    return res.status(201).json({ status: 'success', data: responseData });
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

exports.updateProduct = async (req, res) => {
  const data = {
    ...req.body,
    product_id: +req.params.product_id,
    images: req.body.images,
  };
  console.log(data, 'data');
  try {
    const responseData = await ProductService.updateProduct(data);
    return res.status(200).json({ status: 'success', data: responseData });
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

exports.softDeleteProduct = async (req, res) => {
  const productId = req.params.product_id;

  try {
    const responseData = await ProductService.softDeleteProduct(productId);
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

exports.hardDeleteProduct = async (req, res) => {
  const productId = req.params.product_id;

  try {
    const responseData = await ProductService.hardDeleteProduct(productId);
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

exports.restoreProduct = async (req, res) => {
  const productId = req.params.product_id;

  try {
    const responseData = await ProductService.restoreProduct(productId);
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

exports.getAllProducts = async (req, res) => {
  try {
    const responseData = await ProductService.getAllProducts();
    return res.status(201).json({ status: 'success', data: responseData });
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

exports.getNewArrivalProducts = async (req, res) => {
  try {
    const responseData = await ProductService.getNewArrivalProducts();
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

exports.getBestSellerProducts = async (req, res) => {
  try {
    const responseData = await ProductService.getBestSellerProducts();
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

exports.getAllUniqueProducts = async (req, res) => {
  try {
    const responseData = await ProductService.getAllUniqueProducts();
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

exports.getProduct = async (req, res) => {
  const productId = req.params.product_id;
  try {
    const responseData = await ProductService.getProduct(productId);
    res.status(200).json({ status: 'success', data: responseData });
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

exports.getProductImageByPreCode = async (req, res) => {
  const preCode = req.params.pre_code;
  try {
    const responseData = await ProductService.getProductImageByPreCode(preCode);
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

exports.getProductByProductCode = async (req, res) => {
  const productCode = req.params.product_code;
  try {
    const responseData =
      await ProductService.getProductByProductCode(productCode);
    res.status(200).json({ status: 'success', data: responseData });
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
