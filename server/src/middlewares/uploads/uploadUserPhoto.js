const multer = require('multer');
const path = require('path');
const DatauriParser = require('datauri/parser');
const cloudinary = require('../../utils/cloudinary');
const AppError = require('../../utils/appError');

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

exports.uploadPhoto = upload.single('photo');

exports.updateUserPhoto = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const deleteOldImage = async (img) => {
      await cloudinary.uploader.destroy(img, function () {
        console.log('image deleted successfully');
      });
    };

    const public_id = req.body.avatar
      .split('/')
      .slice(7, 10)
      .join('/')
      .split('.')[0];

    await deleteOldImage(public_id);
    const createImage = async (img) => {
      const parser = new DatauriParser();
      const base64Image = parser.format(
        path.extname(img.originalname).toString(),
        img.buffer,
      );

      const uploadedImageResponse = await cloudinary.uploader.upload(
        base64Image.content,
        { folder: 'nike-shopping/users' },
        function () {
          console.log('image uploaded successfully');
        },
      );

      return uploadedImageResponse;
    };

    const createdImage = await createImage(req.file);

    req.file.filename = createdImage.secure_url;
    req.body.avatar = req.file.filename;
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }

  next();
};

exports.createUserPhoto = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const createImage = async (img) => {
      const parser = new DatauriParser();
      const base64Image = parser.format(
        path.extname(img.originalname).toString(),
        img.buffer,
      );

      const uploadedImageResponse = await cloudinary.uploader.upload(
        base64Image.content,
        { folder: 'nike-shopping/users' },
        function () {
          console.log('image uploaded successfully');
        },
      );

      return uploadedImageResponse;
    };

    const createdImage = await createImage(req.file);
    console.log(createdImage, 'createdImage');

    req.file.filename = createdImage.secure_url;
    req.body.avatar = req.file.filename;
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
  next();
};

exports.updateAdminPhoto = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const deleteOldImage = async (img) => {
      await cloudinary.uploader.destroy(img, function () {
        console.log('image deleted successfully');
      });
    };

    const public_id = req.body.avatar
      .split('/')
      .slice(7, 10)
      .join('/')
      .split('.')[0];

    await deleteOldImage(public_id);
    const createImage = async (img) => {
      const parser = new DatauriParser();
      const base64Image = parser.format(
        path.extname(img.originalname).toString(),
        img.buffer,
      );

      const uploadedImageResponse = await cloudinary.uploader.upload(
        base64Image.content,
        { folder: 'nike-shopping/admins' },
        function () {
          console.log('image uploaded successfully');
        },
      );

      return uploadedImageResponse;
    };

    const createdImage = await createImage(req.file);
    console.log(createdImage, 'createdImage');

    req.file.filename = createdImage.secure_url;
    req.body.avatar = req.file.filename;
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }

  next();
};

exports.createAdminPhoto = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const createImage = async (img) => {
      const parser = new DatauriParser();
      const base64Image = parser.format(
        path.extname(img.originalname).toString(),
        img.buffer,
      );

      const uploadedImageResponse = await cloudinary.uploader.upload(
        base64Image.content,
        { folder: 'nike-shopping/admins' },
        function () {
          console.log('image uploaded successfully');
        },
      );

      return uploadedImageResponse;
    };

    const createdImage = await createImage(req.file);
    console.log(createdImage, 'createdImage');

    req.file.filename = createdImage.secure_url;
    req.body.avatar = req.file.filename;
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }

  next();
};
