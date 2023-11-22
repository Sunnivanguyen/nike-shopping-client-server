const express = require('express');
const multer = require('multer');

const upload = multer();

const sizeController = require('../controllers/sizeController');

const router = express.Router();

router.post('/', upload.none(), sizeController.createSize);

router.get('/', sizeController.getAllSizes);

module.exports = router;
