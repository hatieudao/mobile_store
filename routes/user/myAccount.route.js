const express = require('express');
const router = express.Router();
const myAccountController = require('../../controllers/myAccount.controller');
const verifyMiddleware = require('../../middlewares/verified.middlewares');
/* GET home page. */
router.get('/', myAccountController.isLogin,
  verifyMiddleware.isVerified,
  myAccountController.myAccount);
router.post('/', myAccountController.isLogin, myAccountController.updateAccount);

module.exports = router;
