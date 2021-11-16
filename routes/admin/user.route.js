var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('admin/user/userList', { title: 'User List', layout: 'admin/layout.hbs' });
});

router.get('/:userId', function (req, res, next) {
  const id = req.params.userId
  res.render('admin/user/user', { title: `User ${id}`, layout: 'admin/layout.hbs' });
});

module.exports = router;
