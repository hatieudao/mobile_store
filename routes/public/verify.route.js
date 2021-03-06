const express = require('express');
const router = express.Router();

const verifyController = require('../../controllers/verify.controller');

router.get('/', verifyController.sendEmailVertifyToUserEmail);
router.get('/:token', verifyController.verifyToken);

module.exports = router;
