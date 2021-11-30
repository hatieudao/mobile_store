const mobileService = require('../services/mobileService');
const brandService = require("../services/brandService");

/*exports.listLatestProduct = async (req, res) => {
  const { page, limit } = req.query;
  const mobiles = await mobileService.getLatestProduct(page || 1, limit || 5);
  //const brands = await brandService.list();
  //res.json(mobiles)
  res.render('index', {mobiles});
}*/

module.exports.getHome = async (req, res, next) => {
  //res.render('layout')
  const { page, limit } = req.query;
  const mobiles = await mobileService.getLatestProduct(page || 1, limit || 10);
  //const brands = await brandService.list();
  //res.json(mobiles)
  res.render('home', {mobiles});
}
