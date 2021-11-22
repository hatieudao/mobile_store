const { where } = require('sequelize/dist');
const { models } = require('../models');

exports.list = () => models.mobiles.findAll();
exports.getListMobileAPage = (page, perPage) => models.mobiles.findAll({
  offset: (page - 1) * perPage,
  limit: perPage
});
exports.getMobileById = (id) => models.mobiles.findAll({ where: ({ id: id, }) });
