var express = require('express');
var router = express.Router();

const accountRouter = require('./account.route');
const orderRouter = require('./order.route');
const productRouter = require('./product.route');
const userRouter = require('./user.route');
const authRouter = require('./auth.route');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('admin/index', { title: 'Dashboard', layout: 'admin/layout.hbs' });
});

router.use('/order', orderRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/account', accountRouter);
router.use('/login', authRouter);

module.exports = router;
