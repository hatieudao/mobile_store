const { models } = require('../models');

exports.list = () => models.mobiles.findAll();
exports.getListMobileAPage = (page, limit) => models.mobiles.findAll({
  offset: (page - 1) * limit,
  limit
});
exports.getMobileById = (id) => models.mobiles.findAll({
  include: [
    { model: models.brands, require: true, as: 'brand' },
    { model: models.configurations, require: true, as: 'configurations' },
    { model: models.options, require: true, as: 'options', attributes: ['name', 'price'] },
    { model: models.pictures, require: true, as: 'pictures', attributes: ['link'] },
    { model: models.comments, require: true, as: 'comments', attributes: ['user_id', 'body', 'created_at', 'updated_at'] }
  ],
  where: ({ id })
});
exports.getMobileByBrand = (brand, page, limit) => models.mobiles.findAll({
  include: {
    model: models.brands, require: true,
    as: 'brand',
    where: { name: brand }
  },
  offset: (page - 1) * limit,
  limit: limit
})
