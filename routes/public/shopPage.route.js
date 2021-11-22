const express = require('express');
const router = express.Router();
const shopPageController = require('../../controllers/shopPage.controller');

router.get('/', shopPageController.listMobilePage);
router.get('/:id', shopPageController.detailMobile);

module.exports = router;
