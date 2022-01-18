const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/cart.controller')

router.get('/', cartController.getCart);

router.get('/getMyCartApi', cartController.getMyCart);

router.post('/removeItem', cartController.removeItem);

router.post('/addItem', cartController.addItem);

router.get('/updateCartLogin', cartController.updateCartLogin);

router.get('/updateCart', cartController.updateCart);

/*router.get('/', function(req, res, next) {
  res.render('cart', { title: 'Cart' });
});*/


module.exports = router;
