const { where } = require('sequelize/dist');
const { models } = require('../models');

exports.list = () => models.brands.findAll();

exports.getBrandIdByName = (name) => models.brands.findAll({ where: ({ name }) })


