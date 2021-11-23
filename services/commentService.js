const { where } = require('sequelize/dist');
const { models } = require('../models');


exports.getCommentByMobileId = (mobile_id) => models.comments.findAll({ where: ({ mobile_id }) })


