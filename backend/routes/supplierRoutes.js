const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.post('/sale', supplierController.createSupplierSale);
router.get('/sale', supplierController.getSuppliers);

module.exports = router;
