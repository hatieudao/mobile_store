const {models} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.list = () => models.mobiles.findAll();

exports.getListMobileAPage = (page, limit, filter) => {
    let min = 0, max = Number.MAX_VALUE;
    switch (filter.price) {
        case "1":
            max = 2000000;
            break;
        case "2":
            min = 2000000;
            max = 5000000;
            break;
        case "3":
            min = 5000000;
            max = 10000000;
            break;
        case "4":
            min = 10000000;
            max = 20000000;
            break;
        case "5":
            min = 20000000;
            break;
        default:
            break
    }

    let options = {
        include: [
            {
                model: models.brands, as: "brand", where: {}
            },
            {
                model: models.pictures, as: "pictures", where: {}
            }
        ],
        order: [],
        offset: (page - 1) * limit,
        limit: limit,
        where: {
            price: {
                [Op.gte]: min,
                [Op.lte]: max
            }
        }
    }

    if (filter.search && filter.search != '') {
        options.where.full_name = {
            [Op.like]: `%${filter.search}%`
        }
    }

    if (filter.brandId > 0) {
        options.include[0].where.id = filter.brandId;
    }

    switch (filter.sort) {
        case "1":
            options.order[0] = ['created_at', 'DESC'];
            break;
        case "2":
            options.order[0] = ['price', 'ASC'];
            break;
        case "3":
            options.order[0] = ['price', 'DESC'];
            break;
        default:
            break;
    }

    const result = models.mobiles.findAndCountAll(options);
    return result;
}

exports.countMobiles = (page, limit, filter) => {
    let min = 0, max = Number.MAX_VALUE;
    switch (filter.price) {
        case "1":
            max = 2000000;
            break;
        case "2":
            min = 2000000;
            max = 5000000;
            break;
        case "3":
            min = 5000000;
            max = 10000000;
            break;
        case "4":
            min = 10000000;
            max = 20000000;
            break;
        case "5":
            min = 20000000;
            break;
        default:
            break
    }

    let options = {
        include: [
            {
                model: models.brands, as: "brand", where: {}
            }/*,
            {
                model: models.pictures, as: "pictures", where: {}
            }*/
        ],
        order: [],
        offset: (page - 1) * limit,
        limit: limit,
        where: {
            price: {
                [Op.gte]: min,
                [Op.lte]: max
            }
        }
    }

    if (filter.search && filter.search != '') {
        options.where.full_name = {
            [Op.like]: `%${filter.search}%`
        }
    }

    if (filter.brandId > 0) {
        options.include[0].where.id = filter.brandId;
    }

    switch (filter.sort) {
        case "1":
            options.order[0] = ['created_at', 'DESC'];
            break;
        case "2":
            options.order[0] = ['price', 'ASC'];
            break;
        case "3":
            options.order[0] = ['price', 'DESC'];
            break;
        default:
            break;
    }

    const result = models.mobiles.findAndCountAll(options);
    return result;
}

exports.getLatestProduct = (page, limit) => {
    const result = models.mobiles.findAll({
        include: [
            {model: models.pictures, as: "pictures"}
        ],
        order: [
            ['created_at', 'DESC']
        ],
        offset: (page - 1) * limit,
        limit: limit
    });
    return result;
}

exports.getMobileById = (id) => models.mobiles.findAll({
    include: [
        {model: models.brands, require: true, as: 'brand'},
        {model: models.configurations, require: true, as: 'configurations'},
        {model: models.options, require: true, as: 'options', attributes: ['name', 'price']},
        {model: models.pictures, require: true, as: 'pictures', attributes: ['link']},
        {
            model: models.comments,
            require: true,
            as: 'comments',
            attributes: ['user_id', 'body', 'created_at', 'updated_at']
        }
    ],
    where: ({id})
});

exports.getMobileByBrandId = (brandId, page, limit) => models.mobiles.findAll({
    include: [
        {
            model: models.brands, require: true,
            as: 'brand',
            where: {id: brandId}
        },
        {
            model: models.pictures,
            as: "pictures"
        }
    ],
    order: [
        ['price', 'DESC']
    ],
    offset: (page - 1) * limit,
    limit: limit
})

exports.getMobileByBrand = (brand, page, limit) => models.mobiles.findAll({
    include: {
        model: models.brands, require: true,
        as: 'brand',
        where: {name: brand}
    },
    offset: (page - 1) * limit,
    limit: limit
})
