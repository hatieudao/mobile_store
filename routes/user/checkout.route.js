const express = require('express');
const router = express.Router();
const checkoutController = require('../../controllers/checkout.controller')

/* GET home page. */
router.get('/', checkoutController.getOrder);


router.post('/addOrder', checkoutController.addOrderOfUser);


/*router.get('/', function (req, res, next) {
  res.render('checkout', { title: 'Checkout' });
});*/

module.exports = router;
