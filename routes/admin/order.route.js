var express = require('express');
var router = express.Router();


const orderController = require('../../controllers/admin/admin.order.controller');

router.get('/',orderController.orderList);

router.get('/:orderId', function (req, res, next) {
  const id = req.params.orderId
  res.render('admin/order/orderItem', { title: `Order ${id}`, layout: 'admin/layout.hbs' });
});



module.exports = router;
