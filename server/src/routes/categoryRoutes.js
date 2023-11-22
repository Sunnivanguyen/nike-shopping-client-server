const express = require('express');
const multer = require('multer');

const categoryController = require('../controllers/categoryController');

const upload = multer();

const router = express.Router();

router.post('/', upload.none(), categoryController.createCategory);

router.get('/', categoryController.getAllCategories);

module.exports = router;
