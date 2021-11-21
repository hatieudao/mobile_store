const express = require('express');
const router = express.Router();
const shopPageController = require('../../controllers/shopPage.controller');

/* GET home page. */
router.get('/', shopPageController.list);

module.exports = router;
