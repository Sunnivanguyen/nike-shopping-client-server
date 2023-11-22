const ProductImageService = require('../services/productImageService');

exports.createProductImage = async (req, res, next) => {
  const data = req.body;

  const result = await ProductImageService.createProductImage({ data });

  req.result = result;

  next();
};
