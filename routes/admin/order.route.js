var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('admin/order/orderList', { title: 'Order List', layout: 'admin/layout.hbs' });
});

router.get('/:orderId', function (req, res, next) {
  const id = req.params.orderId
  res.render('admin/order/orderItem', { title: `Order ${id}`, layout: 'admin/layout.hbs' });
});



module.exports = router;
