const { where } = require('sequelize/dist');
const { models } = require('../models');


exports.getCapacityOfMobileById = (id) => models.capacities.findAll({ where: ({ id }) })


