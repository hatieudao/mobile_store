var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('admin/product/productList', { title: 'Product List', layout: 'admin/layout.hbs' });
});

router.get('/:add', function (req, res, next) {
  res.render('admin/product/productAddItem', { title: 'Product', layout: 'admin/layout.hbs' });
});



module.exports = router;
