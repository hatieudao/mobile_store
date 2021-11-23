const { where } = require('sequelize/dist');
const { models } = require('../models');


exports.getConfigurationsByMobileId = (mobile_id) => models.configurations.findAll({ where: ({ mobile_id }) })


