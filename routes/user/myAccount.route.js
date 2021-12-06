const express = require('express');
const router = express.Router();
myAccountController = require('../../controllers/myAccount.controller');

/* GET home page. */
router.get('/:username', myAccountController.myAccount);
router.post('/:username', myAccountController.updateAccount);

module.exports = router;
