const { where } = require('sequelize/dist');
const { models } = require('../models');


exports.getOptionsByMobileId = (mobile_id) => models.options.findAll({ where: ({ mobile_id }) })

exports.getOptionsById = (id) => models.options.findOne({ where: ({ id }), raw: true })

exports.getFirstOptionsByMobileId = (mobile_id) => {
  return models.options.findOne(
    {
      where: ({ mobile_id: mobile_id }),
      raw: true
    }
  )
}
