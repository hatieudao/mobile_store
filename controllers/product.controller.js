const mobileService = require('../services/mobileService')
const configurationService = require('../services/configurationService')
const specificationService = require('../services/specificationService')
const optionService = require('../services/optionService')
const capacityService = require('../services/capacityService')
const commentService = require('../services/commentService')
const brandService = require('../services/brandService')
const {models} = require('../config/database')
const pictureService = require('../services/pictureService')
const paginateHelper = require('express-handlebars-paginate');
const userService = require("../services/userServices");

exports.list = async (req, res) => {
    const mobiles = await mobileService.list()
    res.json(mobiles)
}

exports.listMobilePage = async (req, res) => {
    if ((req.query.page === null) || isNaN(req.query.page)) {
        req.query.page = 1;
    }
    if ((req.query.limit === null) || isNaN(req.query.limit)) {
        req.query.limit = 12;
    }
    if ((req.query.brandId === null) || isNaN(req.query.brandId)) {
        req.query.brandId = 0;
    }
    if ((req.query.price === null) || isNaN(req.query.price)) {
        req.query.price = 0;
    }
    if ((req.query.sort === null) || isNaN(req.query.sort)) {
        req.query.sort = 0;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const {brandId, price, sort, search} = req.query;

    const filter = {
        brandId: brandId,
        price: price,
        sort: sort,
        search: search
    }

    const allMobiles = await mobileService.getListMobileAPage(page || 1, limit || 12, filter);
    let mobiles = allMobiles.rows;
    for (let mobile of mobiles) {
        const picture = await pictureService.getAvatarPictureByProductId(mobile.id);
        mobile.picture = picture.link;
    }

    const brands = await brandService.list();

    const count = allMobiles.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.render('product', {
        mobiles: mobiles,
        brands: brands,
        pagination: pagination
    });
}

exports.detailMobile = async (req, res) => {
    const {id} = req.params;
    const mobile_id = parseInt(id) || 1;
    const mobile = (await mobileService.getMobileById(mobile_id))[0]
    const {configurations} = mobile
    const details = []
    for (const [pos, configuration] of Object.entries(configurations)) {
        const {specification_id, value} = configuration
        const {name} = (await specificationService.getSpecificationById(specification_id))[0]
        details.push({name, value})
    }
    const mb = mobile.toJSON()
    mb.configurations = details

    //const mobileId = req.params.mobileId;


    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    let allComments = await commentService.findAndCountAllCommentByMobileId(mobile_id, limit, page);
    const comments = allComments.rows;
    const count = allComments.count;


    for (let comment of comments) {
        const user_id = comment.user_id;
        const user = await userService.getUserbyId(user_id);

        //set avatar default
        if (user.avatar === null) {
            user.avatar = 'https://icons.iconarchive.com/icons/papirus-team/papirus-status/256/avatar-default-icon.png';
        }
        comment.user = user;
    }

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }


    //res.json(mb)
    //const {page, limit} = req.query;
    const lastedProduct = await mobileService.getLatestProduct(page || 1, limit || 10);
    const relatedProduct = await mobileService.getMobileByBrandId(mb.brand_id, page || 1, limit || 5);
    res.render('product/productDetail', {mb, lastedProduct, relatedProduct, pagination, comments});
}

exports.filterMobileByBrand = async (req, res) => {
    const {name} = req.params
    const {page, limit} = req.query
    const mobiles = await mobileService.getMobileByBrand(name, page, limit || 10)
    res.json(mobiles)
}
