const { where } = require('sequelize/dist');
const { models } = require('../models');


exports.getSpecificationById = (id) =>
  models.specifications.findAll({ where: ({ id: id }) });
