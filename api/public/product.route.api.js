const express = require('express');
const router = express.Router();

const apiProductController = require('./product.controller.api');

/* GET home page. */
router.post('/addComment', apiProductController.addComment);

router.get('/:mobileId/comment', apiProductController.comment);

module.exports = router;
