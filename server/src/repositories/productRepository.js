const { Op, Sequelize } = require('sequelize');

const connectMysql = require('../configs/db.config');

const ProductEntity = require('../entities/productEntity');
const ProductSizeEntity = require('../entities/productSizeEntity');
const ProductImageEntity = require('../entities/productImageEntity');
const ProductHighlightEntity = require('../entities/productHighlightEntity');
const ProductDetailEntity = require('../entities/productDetailEntity');

class ProductRepository {
  async createProduct(productEntity) {
    const newProduct = await ProductEntity.create(productEntity);

    return newProduct;
  }

  async updateProduct(productEntity) {
    const updatedProduct = await ProductEntity.update(productEntity, {
      where: { id: +productEntity.id },
    });

    return updatedProduct;
  }

  async getAllProducts() {
    const products = await ProductEntity.findAll();
    return products;
  }

  async getNewArrivalProducts() {
    const products = await ProductEntity.findAll({
      order: ProductEntity.sequelize.col('product_launch_date'),
    });

    return products;
  }

  async getBestSellerProducts() {
    const products = await ProductEntity.findAll({
      order: ProductEntity.sequelize.col('sales_volume'),
    });

    return products;
  }

  async getAllUniqueProducts() {
    const query = `
      SELECT *
      FROM (
        SELECT *, ROW_NUMBER() OVER (PARTITION BY pre_code ORDER BY id) AS rn
        FROM products
      ) t
      WHERE t.rn = 1
    `;
    const uniqueProducts = await connectMysql.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
    return uniqueProducts;
  }

  async getAllUniqueImages(productIds) {
    const images = await ProductImageEntity.findAll({
      where: {
        product_id: {
          [Op.or]: productIds,
        },
        image_alt: 2,
      },
    });

    return images;
  }

  async getProductByProductCode(productCode) {
    const product = await ProductEntity.findOne({
      where: { product_code: productCode },
    });

    return product;
  }

  async getProduct(productId) {
    const product = await ProductEntity.findByPk(+productId);
    return product;
  }

  async softDeleteProduct(productId) {
    const deletedProduct = await ProductEntity.destroy({
      where: { id: +productId },
    });
    return deletedProduct;
  }

  async hardDeleteProduct(productId) {
    const deletedProduct = await ProductEntity.destroy({
      where: { id: +productId },
      force: true,
    });
    return deletedProduct;
  }

  async restoreProduct(productId) {
    const restoredProduct = await ProductEntity.restore({
      where: { id: +productId },
    });
    return restoredProduct;
  }

  async getProductImage(productId) {
    const image = await ProductImageEntity.findAll({
      where: { product_id: productId },
    });

    return image;
  }

  async getProductSize(productId) {
    const size = await ProductSizeEntity.findAll({
      where: { product_id: productId },
    });

    return size;
  }

  async getProductSizes() {
    const size = await ProductSizeEntity.findAll();

    return size;
  }

  async getProductHighlight(productId) {
    const highlight = await ProductHighlightEntity.findAll({
      where: { product_id: productId },
    });

    return highlight;
  }

  async getProductHighlights() {
    const highlight = await ProductHighlightEntity.findAll();

    return highlight;
  }

  async getProductDetails() {
    const detail = await ProductDetailEntity.findAll();

    return detail;
  }
}

module.exports = new ProductRepository();
