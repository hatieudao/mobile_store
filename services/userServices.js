const {where} = require('sequelize/dist');
const {models} = require('../models');


exports.getUserbyId = (id) => models.users.findOne({
    where: {
        id: id
    },
    raw: true
});
