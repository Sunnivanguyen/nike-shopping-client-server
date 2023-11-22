const ProductHighlightService = require('../services/productHighlightService');

exports.createProductHighlight = async (req, res, next) => {
  const data = req.body;

  const result = await ProductHighlightService.createProductHighlight({ data });

  req.result = result;

  next();
};
