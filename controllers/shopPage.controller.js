const mobileService = require('../services/mobileService');

exports.list = async (req, res) => {
  const mobiles = await mobileService.list();
  res.json(mobiles);
}
