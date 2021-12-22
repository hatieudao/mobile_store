var express = require('express');
var router = express.Router();

const adminUserController = require('../../controllers/admin/admin.adminUser.controller');

router.get('/',adminUserController.adminUserList);

router.get('/addPage',adminUserController.addAdminUserPage);
router.get('/add',adminUserController.addAdminUser);
router.get('/lockAll',adminUserController.lockAllAdminUser)
router.get('/currentAccount',adminUserController.adminCurrentAccount);
router.get('/:id',adminUserController.adminAccount);

// router.get('/currentAccount', function (req, res, next) {
//     res.render('admin/product', { title: `User ${id}`, layout: 'admin/layout.hbs' });
// });

module.exports = router;
