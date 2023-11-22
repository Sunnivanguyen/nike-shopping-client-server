const express = require('express');
const multer = require('multer');

const upload = multer();
const paymentMethodController = require('../controllers/paymentMethodController');

const router = express.Router();

router.post('/', upload.none(), paymentMethodController.createPaymentMethod);

router.get('/', paymentMethodController.getAllPaymentMethods);

module.exports = router;
