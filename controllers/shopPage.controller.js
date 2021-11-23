const mobileService = require('../services/mobileService')
const configurationService = require('../services/configurationService')
const specificationService = require('../services/specificationService')
const optionService = require('../services/optionService')
const capacityService = require('../services/capacityService')
const commentService = require('../services/commentService')
const brandService = require('../services/brandService')
const { models } = require('../config/database')
const pictureService = require('../services/pictureService')
exports.list = async (req, res) => {
  const mobiles = await mobileService.list()
  res.json(mobiles)
}

exports.listMobilePage = async (req, res) => {
  const { page, limit } = req.query
  const mobiles = await mobileService.getListMobileAPage(page, limit || 10)
  res.json(mobiles)
}

exports.detailMobile = async (req, res) => {
  const { id } = req.params
  const mobile_id = parseInt(id)
  const mobile = (await mobileService.getMobileById(mobile_id))[0]
  const { configurations } = mobile
  const details = []
  for (const [pos, configuration] of Object.entries(configurations)) {
    const { specification_id, value } = configuration
    const { name } = (await specificationService.getSpecificationById(specification_id))[0]
    details.push({ name, value })
  }
  const mb = mobile.toJSON()
  mb.configurations = details
  res.json(mb)
}
exports.filterMobileByBrand = async (req, res) => {
  const { name } = req.params
  const { page, limit } = req.query
  const mobiles = await mobileService.getMobileByBrand(name, page, limit || 10)
  res.json(mobiles)
}
