const ProductRepository = require('../repositories/productRepository');
const ProductSizeRepository = require('../repositories/productSizeRepository');
const ProductDetailRepository = require('../repositories/productDetailRepository');
const ProductHighlightRepository = require('../repositories/productHighlightRepository');
const ProductImageRepository = require('../repositories/productImageRepository');
const { BadRequestException, NotFoundException } = require('../exceptions');

class ProductService {
  async createProduct({ data }) {
    const sizes = JSON.parse(data.sizes);
    const details = JSON.parse(data.details);
    const highlights = JSON.parse(data.highlights);
    const images = data.images;

    async function loopThroughSizes(productId) {
      const newSizes = await Promise.all(
        sizes.map((size) => {
          const sizeEntity = {
            product_id: +productId,
            size_id: +size.size_id,
            in_stock: +size.in_stock,
          };
          return ProductSizeRepository.createProductSize(sizeEntity);
        }),
      );
      const responseData = newSizes.map((size) => {
        return size.dataValues;
      });
      return responseData;
    }

    async function loopThroughDetails(productId) {
      const newDetails = await Promise.all(
        details.map((detail) => {
          const detailEntity = {
            product_id: +productId,
            text: detail.text,
          };
          return ProductDetailRepository.createProductDetail(detailEntity);
        }),
      );

      const responseData = newDetails.map((detail) => {
        return detail.dataValues;
      });
      return responseData;
    }

    async function loopThroughHighlights(productId) {
      const newHighlights = await Promise.all(
        highlights.map((highlight) => {
          const highlightEntity = {
            product_id: +productId,
            text: highlight.text,
          };
          return ProductHighlightRepository.createProductHighlight(
            highlightEntity,
          );
        }),
      );
      const responseData = newHighlights.map((highlight) => {
        return highlight.dataValues;
      });
      return responseData;
    }

    async function loopThroughImages({ productId, productCode }) {
      const newImages = await Promise.all(
        images.map((image) => {
          const imageEntity = {
            product_id: +productId,
            product_code: productCode,
            image_src: image.image_src,
            image_alt: image.image_alt,
          };
          return ProductImageRepository.createProductImage(imageEntity);
        }),
      );
      const responseData = newImages.map((image) => {
        return image.dataValues;
      });
      return responseData;
    }

    const productEntity = {
      product_code: data.product_code,
      pre_code: data.product_code.slice(0, 6),
      product_name: data.product_name,
      product_launch_date: data.product_launch_date,
      buy_price: data.buy_price,
      sex: +data.sex,
      category_id: +data.category_id,
      product_color: data.product_color,
      product_description: data.product_description,
      sales_volume: +data.sales_volume,
    };

    try {
      const newProduct = await ProductRepository.createProduct(productEntity);
      console.log(newProduct, 'NEW PRODUCT');

      if (!newProduct) {
        throw new BadRequestException('Bad Request', 400);
      }

      const productId = newProduct.dataValues.id;
      const productCode = newProduct.dataValues.product_code;

      const newSizes = await loopThroughSizes(productId);
      const newDetails = await loopThroughDetails(productId);
      const newHighlights = await loopThroughHighlights(productId);
      const newImages = await loopThroughImages({ productId, productCode });

      if (!sizes || !details || !highlights || !images) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        newProduct,
        newSizes,
        newDetails,
        newHighlights,
        newImages,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(data) {
    const sizes = JSON.parse(data.sizes);
    const details = JSON.parse(data.details);
    const highlights = JSON.parse(data.highlights);
    const images = data.images;

    async function loopThroughSizes() {
      const updatedSizes = await Promise.all(
        sizes.map(async (size) => {
          const sizeEntity = {
            id: size.id,
            product_id: +size.product_id,
            size_id: +size.size_id,
            in_stock: +size.in_stock,
          };
          const data =
            await ProductSizeRepository.updateProductSize(sizeEntity);
          return data;
        }),
      );

      return updatedSizes;
    }

    async function loopThroughDetails() {
      const updatedDetails = await Promise.all(
        details.map(async (detail) => {
          const detailEntity = {
            id: detail.id,
            product_id: +detail.product_id,
            text: detail.text,
          };

          const data =
            await ProductDetailRepository.updateProductDetail(detailEntity);
          return data;
        }),
      );
      return updatedDetails;
    }

    async function loopThroughHighlights() {
      const updatedHighlights = await Promise.all(
        highlights.map(async (highlight) => {
          const highlightEntity = {
            id: highlight.id,
            product_id: +highlight.product_id,
            text: highlight.text,
          };
          const data =
            await ProductHighlightRepository.updateProductHighlight(
              highlightEntity,
            );
          return data;
        }),
      );
      return updatedHighlights;
    }

    async function loopThroughImages() {
      const updatedImages = await Promise.all(
        images.map((imageEntity) => {
          return ProductImageRepository.updateProductImage(imageEntity);
        }),
      );
      return updatedImages;
    }

    const productEntity = {
      id: data.product_id,
      product_code: data.product_code,
      pre_code: data.product_code.slice(0, 6),
      product_name: data.product_name,
      product_launch_date: data.product_launch_date,
      buy_price: data.buy_price,
      sex: +data.sex,
      category_id: +data.category_id,
      product_color: data.product_color,
      product_description: data.product_description,
      sales_volume: +data.sales_volume,
    };
    console.log(productEntity, 'PRODUCT ENTITY');

    try {
      const updatedProduct =
        await ProductRepository.updateProduct(productEntity);

      if (updatedProduct[0] !== 1) {
        throw new BadRequestException(
          'Bad Request',
          400,
          'Product Validation Error',
        );
      }

      const updatedSizes = await loopThroughSizes();
      const updatedDetails = await loopThroughDetails();
      const updatedHighlights = await loopThroughHighlights();
      const updatedImages = await loopThroughImages();

      const responseData = {
        updatedProduct,
        updatedSizes,
        updatedDetails,
        updatedHighlights,
        updatedImages,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts() {
    try {
      const products = await ProductRepository.getAllProducts();
      if (!products) {
        throw new NotFoundException('Not Found Products', 404);
      }

      async function loopThroughProducts() {
        const productDetails = await Promise.all(
          products.map(async (product) => {
            const sizes = await ProductSizeRepository.getAllProductSizes(
              product.id,
            );
            const sizeData = sizes.map((size) => {
              return size.dataValues;
            });
            const details = await ProductDetailRepository.getAllProductDetails(
              product.id,
            );
            const detailData = details.map((detail) => {
              return detail.dataValues;
            });
            const highlights =
              await ProductHighlightRepository.getAllProductHighlights(
                product.id,
              );
            const highlightData = highlights.map((highlight) => {
              return highlight.dataValues;
            });
            const images = await ProductImageRepository.getAllProductImages(
              product.id,
            );
            const imageData = images.map((image) => {
              return image.dataValues;
            });
            return {
              product,
              sizeData,
              detailData,
              highlightData,
              imageData,
            };
          }),
        );

        return productDetails;
      }

      const details = await loopThroughProducts();

      if (!details) {
        throw new NotFoundException('Not Found Images', 404);
      }

      const responseData = {
        details,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getNewArrivalProducts() {
    try {
      const products = await ProductRepository.getNewArrivalProducts();
      if (!products) {
        throw new NotFoundException('Not Found Products', 404);
      }

      async function loopThroughProducts() {
        const productDetails = await Promise.all(
          products.map(async (product) => {
            const sizes = await ProductSizeRepository.getAllProductSizes(
              product.id,
            );
            const sizeData = sizes.map((size) => {
              return size.dataValues;
            });
            const details = await ProductDetailRepository.getAllProductDetails(
              product.id,
            );
            const detailData = details.map((detail) => {
              return detail.dataValues;
            });
            const highlights =
              await ProductHighlightRepository.getAllProductHighlights(
                product.id,
              );
            const highlightData = highlights.map((highlight) => {
              return highlight.dataValues;
            });
            const images = await ProductImageRepository.getAllProductImages(
              product.id,
            );
            const imageData = images.map((image) => {
              return image.dataValues;
            });
            return {
              product,
              sizeData,
              detailData,
              highlightData,
              imageData,
            };
          }),
        );

        return productDetails;
      }

      const details = await loopThroughProducts();

      if (!details) {
        throw new NotFoundException('Not Found Images', 404);
      }

      const responseData = {
        details,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getBestSellerProducts() {
    try {
      const products = await ProductRepository.getBestSellerProducts();
      if (!products) {
        throw new NotFoundException('Not Found Products', 404);
      }
      async function loopThroughProducts() {
        const productDetails = await Promise.all(
          products.map(async (product) => {
            const sizes = await ProductSizeRepository.getAllProductSizes(
              product.id,
            );
            const sizeData = sizes.map((size) => {
              return size.dataValues;
            });
            console.log(sizeData, 'SIZES');
            const details = await ProductDetailRepository.getAllProductDetails(
              product.id,
            );
            const detailData = details.map((detail) => {
              return detail.dataValues;
            });
            console.log(detailData, 'DETAILS');
            const highlights =
              await ProductHighlightRepository.getAllProductHighlights(
                product.id,
              );
            const highlightData = highlights.map((highlight) => {
              return highlight.dataValues;
            });
            console.log(highlightData, 'HIGHLIGHTS');
            const images = await ProductImageRepository.getAllProductImages(
              product.id,
            );
            const imageData = images.map((image) => {
              return image.dataValues;
            });
            console.log(imageData, 'IMAGES');
            return {
              product,
              sizeData,
              detailData,
              highlightData,
              imageData,
            };
          }),
        );

        return productDetails;
      }

      const details = await loopThroughProducts();

      if (!details) {
        throw new NotFoundException('Not Found Images', 404);
      }

      const responseData = {
        details,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getAllUniqueProducts() {
    try {
      const products = await ProductRepository.getAllUniqueProducts();
      if (!products) {
        throw new NotFoundException('Not Found Products', 404);
      }
      async function loopThroughProducts() {
        const productDetails = await Promise.all(
          products.map(async (product) => {
            const sizes = await ProductSizeRepository.getAllProductSizes(
              product.id,
            );
            const sizeData = sizes.map((size) => {
              return size.dataValues;
            });
            console.log(sizeData, 'SIZES');
            const details = await ProductDetailRepository.getAllProductDetails(
              product.id,
            );
            const detailData = details.map((detail) => {
              return detail.dataValues;
            });
            console.log(detailData, 'DETAILS');
            const highlights =
              await ProductHighlightRepository.getAllProductHighlights(
                product.id,
              );
            const highlightData = highlights.map((highlight) => {
              return highlight.dataValues;
            });
            console.log(highlightData, 'HIGHLIGHTS');
            const images = await ProductImageRepository.getAllProductImages(
              product.id,
            );
            const imageData = images.map((image) => {
              return image.dataValues;
            });
            console.log(imageData, 'IMAGES');
            return {
              product,
              sizeData,
              detailData,
              highlightData,
              imageData,
            };
          }),
        );

        return productDetails;
      }

      const details = await loopThroughProducts();

      if (!details) {
        throw new NotFoundException('Not Found Images', 404);
      }

      const responseData = {
        details,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getProductByProductCode(productCode) {
    try {
      const product =
        await ProductRepository.getProductByProductCode(productCode);

      const sizes = await ProductSizeRepository.getAllProductSizes(product.id);
      const details = await ProductDetailRepository.getAllProductDetails(
        product.id,
      );
      const highlights =
        await ProductHighlightRepository.getAllProductHighlights(product.id);
      const images = await ProductImageRepository.getAllProductImages(
        product.id,
      );
      const imageColor = await ProductImageRepository.getProductImageColors(
        product.pre_code,
      );
      if (!product) {
        throw new NotFoundException(
          'Not Found Product',
          404,
          'Product Not Found',
        );
      }
      if (!sizes) {
        throw new NotFoundException('Not Found Sizes', 404, 'Sizes Not Found');
      }
      if (!details) {
        throw new NotFoundException(
          'Not Found Details',
          404,
          'Details Not Found',
        );
      }
      if (!highlights) {
        throw new NotFoundException(
          'Not Found Highlights',
          404,
          'Highlights Not Found',
        );
      }
      if (!images) {
        throw new NotFoundException(
          'Not Found Images',
          404,
          'Images Not Found',
        );
      }

      const responseData = {
        product,
        details,
        highlights,
        sizes,
        images,
        imageColor,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getProduct(productId) {
    try {
      const product = await ProductRepository.getProduct(productId);
      const details =
        await ProductDetailRepository.getAllProductDetails(productId);
      const highlights =
        await ProductHighlightRepository.getAllProductHighlights(productId);
      const sizes = await ProductSizeRepository.getAllProductSizes(productId);
      const images =
        await ProductImageRepository.getAllProductImages(productId);
      const imageColor = await ProductImageRepository.getProductImageColors(
        product.pre_code,
      );

      if (!product) {
        throw new NotFoundException('Not Found Product', 404);
      }

      const responseData = {
        product,
        details,
        highlights,
        sizes,
        images,
        imageColor,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async softDeleteProduct(productId) {
    try {
      const deletedProduct =
        await ProductRepository.softDeleteProduct(productId);
      if (deletedProduct !== 1) {
        throw new BadRequestException('Not Found Product', 404);
      }

      const responseData = {
        deletedProduct,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async hardDeleteProduct(productId) {
    try {
      const deletedProduct =
        await ProductRepository.hardDeleteProduct(productId);
      if (deletedProduct !== 1) {
        throw new BadRequestException('Not Found Product', 404);
      }

      const responseData = {
        deletedProduct,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async restoreProduct(productId) {
    try {
      const restoredProduct = await ProductRepository.restoreProduct(productId);
      if (restoredProduct !== 1) {
        throw new BadRequestException('Not Found Product', 404);
      }

      console.log(restoredProduct, 'RESTORED PRODUCT');

      const responseData = {
        restoredProduct,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductService();
