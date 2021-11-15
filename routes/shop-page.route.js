const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('shop-page', { title: 'Shop Page' });
});

module.exports = router;
