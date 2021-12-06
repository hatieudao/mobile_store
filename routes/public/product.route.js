const express = require('express');
const router = express.Router();

const productController = require('../../controllers/product.controller');

/* GET home page. */
router.get('/', productController.listMobilePage);

router.get('/:id', productController.detailMobile);

//router.get('/', productController.filterMobile);

module.exports = router;