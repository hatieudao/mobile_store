const { where } = require('sequelize/dist');
const { models } = require('../models');


exports.getOptionsByMobileId = (mobile_id) => models.options.findAll({ where: ({ mobile_id }) })


