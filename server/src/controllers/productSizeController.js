const ProductSizeService = require('../services/productSizeService');

exports.createProductSize = async (req, res, next) => {
  const data = req.body;

  const result = await ProductSizeService.createProductSize({ data });

  req.result = result;

  next();
};
