const express = require('express');
const multer = require('multer');

// const checkAuthentication = require('../middlewares/auth/checkAuth');

const adminController = require('../controllers/adminController');

const adminAddressController = require('../controllers/adminAddressController');
const adminAvatarController = require('../controllers/adminAvatarController');

const {
  uploadPhoto,
  createAdminPhoto,
  updateAdminPhoto,
} = require('../middlewares/uploads/uploadUserPhoto');

const upload = multer();

const {
  checkValidAdmin,
  checkValidAdminAddress,
} = require('../middlewares/validation/dataValidator');

const router = express.Router();

// Create Admin
router.post('/', uploadPhoto, createAdminPhoto, adminController.createAdmin);

//Get All Admin
router.get('/', adminController.getAllAdmins);

//Get Admin
router.get('/:admin_id', checkValidAdmin, adminController.getAdmin);

//Update Admin
router.put(
  '/:admin_id',
  checkValidAdmin,
  uploadPhoto,
  updateAdminPhoto,
  adminController.updateAdmin,
);

//Soft Delete Admin
router.delete(
  '/:admin_id/soft-delete',
  checkValidAdmin,
  adminController.softDeleteAdmin,
);

//Hard Delete Admin
router.delete(
  '/:admin_id/hard-delete',
  checkValidAdmin,
  adminController.hardDeleteAdmin,
);

//Restore Admin
router.post('/:admin_id/restore', adminController.restoreAdmin);

// Create Admin Address
router.post(
  '/:admin_id/address',
  upload.none(),
  checkValidAdmin,
  adminAddressController.createAdminAddress,
);

// Get All Admin Addresses
router.get(
  '/:admin_id/address',
  checkValidAdmin,
  adminAddressController.getAllAdminAddresses,
);

//Get Admin Address
router.get(
  '/:admin_id/address/:address_id',
  checkValidAdmin,
  checkValidAdminAddress,
  adminAddressController.getCurrentAdminAddress,
);

//Update Admin Address
router.put(
  '/:admin_id/address/:address_id',
  checkValidAdmin,
  checkValidAdminAddress,
  adminAddressController.updateAdminAddress,
);

//Delete Admin Address
router.delete(
  '/:admin_id/address/:address_id',
  checkValidAdmin,
  checkValidAdminAddress,
  adminAddressController.deleteAdminAddress,
);

module.exports = router;
