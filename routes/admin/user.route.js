var express = require('express');
var router = express.Router();

const userController = require('../../controllers/admin/admin.user.controller');

router.get('/',userController.userList);

router.get('/:userId', function (req, res, next) {
  const id = req.params.userId
  res.render('admin/user/user', { title: `User ${id}`, layout: 'admin/layout.hbs' });
});

module.exports = router;
