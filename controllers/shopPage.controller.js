const mobileService = require('../services/mobileService');

exports.list = async (req, res) => {
  const mobiles = await mobileService.list();
  res.json(mobiles);
}

exports.listMobilePage = async (req, res) => {
  const { page, perPage } = req.query;
  const mobiles = await mobileService.getListMobileAPage(page, perPage || 10);
  res.json(mobiles);
}

exports.detailMobile = async (req, res) => {
  const { id } = req.params;
  const mobile = await mobileService.getMobileById(parseInt(id));
  res.json(mobile);
}
