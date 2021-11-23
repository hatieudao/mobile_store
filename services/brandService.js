const { where } = require('sequelize/dist');
const { models } = require('../models');


exports.getBrandIdByName = (name) => models.brands.findAll({ where: ({ name }) })


