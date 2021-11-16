var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('adminViews/adminAccount', { title: 'Admin', layout: 'adminViews/layout.hbs' });
});


module.exports = router;
