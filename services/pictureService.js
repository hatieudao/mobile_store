const {where} = require('sequelize/dist');
const {models} = require('../models');


exports.getPicturesOfMobile = (mobile_id) => models.pictures.findAll({
        where: ({mobile_id: mobile_id})
    }
)


