const express = require('express');
const router = express.Router();

const apiProductController = require('./product.controller.api');

/* GET home page. */
router.get('/', apiProductController.getListProduct);

module.exports = router;
