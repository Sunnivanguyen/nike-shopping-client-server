const ProductDetailService = require('../services/productDetailService');

exports.createProductDetail = async (req, res, next) => {
  const data = req.body;

  const result = await ProductDetailService.createProductDetail({ data });

  req.result = result;

  next();
};
