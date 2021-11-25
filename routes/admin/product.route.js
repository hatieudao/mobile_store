var express = require('express');
var router = express.Router();

const productController = require('../../controllers/admin/admin.product.controller');

router.get('/',productController.productList);


router.get('/:add', function (req, res, next) {
  res.render('admin/product/productAddItem', { title: 'Product', layout: 'admin/layout.hbs' });
});


module.exports = router;
