const multer = require('multer');
const path = require('path');
// const sharp = require('sharp');
const DatauriParser = require('datauri/parser');
const cloudinary = require('../../utils/cloudinary');

const AppError = require('../../utils/appError');
const ProductImageEntity = require('../../entities/productImageEntity');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPhotos = upload.array('photos', 4); // You can change the number to the maximum count of photos you want to allow at a time

exports.createProductPhotos = async (req, res, next) => {
  if (req.files.length === 0) {
    return next();
  }

  if (req.files.length > 0) {
    const images = await Promise.all(
      req.files.map(async (file, index) => {
        const parser = new DatauriParser();
        console.log(file, 'FILE');
        const base64Image = parser.format(
          path.extname(file.originalname).toString(),
          file.buffer,
        );

        const uploadedImageResponse = await cloudinary.uploader.upload(
          base64Image.content,
          { folder: 'nike-shopping/products' },
          function () {
            console.log('image uploaded successfully');
          },
        );

        file.filename = uploadedImageResponse.secure_url;

        return { image_src: file.filename, image_alt: `${index + 1}` };
      }),
    );

    req.body.images = images;

    return next();
  }
};

exports.updateProductPhotos = async (req, res, next) => {
  if (!req.files) return next();

  const imagesData = await ProductImageEntity.findAll({
    where: {
      product_id: req.params.product_id,
    },
  });

  console.log(imagesData);

  if (imagesData) {
    const previousImages = imagesData.map((image) => {
      return image.dataValues;
    });

    const images = await Promise.all(
      req.files.map(async (file, index) => {
        const parser = new DatauriParser();
        console.log(file, 'FILE');
        const base64Image = parser.format(
          path.extname(file.originalname).toString(),
          file.buffer,
        );

        const uploadedImageResponse = await cloudinary.uploader.upload(
          base64Image.content,
          { folder: 'nike-shopping/products' },
          function () {
            console.log('image uploaded successfully');
          },
        );

        file.filename = uploadedImageResponse.secure_url;
        // file.filename = `${req.body.product_code}-${index + 1}.png`;

        // sharp(file.buffer)
        //   .toFormat('png')
        //   .png({ quality: 90 })
        //   .toFile(`src/public/img/products/${file.filename}`);

        return {
          id: previousImages[index].id,
          product_id: req.params.product_id,
          product_code: req.body.product_code,
          image_src: file.filename,
          image_alt: `${index + 1}`,
        };
      }),
    );

    req.body.images = images;
  } else {
    const images = await Promise.all(
      req.files.map((file, index) => {
        file.filename = `${req.body.product_code}-${index + 1}.png`;

        sharp(file.buffer)
          .toFormat('png')
          .png({ quality: 90 })
          .toFile(`src/public/img/products/${file.filename}`);

        return {
          product_id: req.params.product_id,
          product_code: req.body.product_code,
          image_src: file.filename,
          image_alt: `${index + 1}`,
        };
      }),
    );
    console.log(images, 'IMAGES');
    req.body.images = images;
    console.log('OKAYS');
    return next();
  }

  return next();
};
