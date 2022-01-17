const {where} = require('sequelize/dist');
const {models} = require('../models');


exports.getPicturesOfMobile = (mobile_id) => models.pictures.findAll({
    where: ({ imageable_id: mobile_id })
  }
)

exports.getAvatarPictureByProductId = (producId) => models.pictures.findOne({
    where: ({mobile_id: producId }),
    raw: true
})


