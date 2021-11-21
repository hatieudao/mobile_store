const { models } = require('../models');

exports.list = () => models.mobiles.findAll();
