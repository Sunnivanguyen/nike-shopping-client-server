const express = require('express');
const multer = require('multer');

const authController = require('../controllers/authController');

const upload = multer();

const router = express.Router();

// User Sign Up
router.post('/user-signup', upload.none(), authController.userSignup);

// User Login
router.post('/user-login', upload.none(), authController.userLogin);

// Admin Sign Up
router.post('/admin-signup', upload.none(), authController.adminSignup);

// Admin Login
router.post('/admin-login', upload.none(), authController.adminLogin);

module.exports = router;
