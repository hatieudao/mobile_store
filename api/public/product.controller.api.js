const {models} = require("../../models");
const mobileService = require("../../services/mobileService");
const pictureService = require("../../services/pictureService");
const brandService = require("../../services/brandService");


module.exports.getListProduct = async (req, res, next) => {
    /*if ((req.query.page === null) || isNaN(req.query.page)) {
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
    }*/

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const {brandId, price, sort, search} = req.query;

    const filter = {
        brandId: brandId,
        price: price,
        sort: sort,
        search: search
    }

    const allMobiles = await mobileService.getListMobileAPage(page, limit, filter);
    let mobiles = allMobiles.rows;

    for (let mobile of mobiles) {
        const picture = await pictureService.getAvatarPictureByProductId(mobile.id);
        mobile.picture = picture.link;
    }

    const count = allMobiles.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.status(200).json({mobiles, pagination});
}

