var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('admin/auth/login', { title: `auth`, layout: 'admin/loginLayout.hbs' });
});



module.exports = router;
