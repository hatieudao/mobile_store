const express = require('express');
const router = express.Router();
myAccountController = require('../../controllers/myAccount.controller');

/* GET home page. */
router.get('/', myAccountController.isLogin, myAccountController.myAccount);
router.post('/', myAccountController.isLogin, myAccountController.updateAccount);

module.exports = router;
