const express = require('express')
const router = express.Router()
const shopPageController = require('../../controllers/shopPage.controller')

router.get('/', shopPageController.listMobilePage)
router.get('/mobile/:id', shopPageController.detailMobile)
router.get('/brand/:name', shopPageController.filterMobileByBrand)
module.exports = router
