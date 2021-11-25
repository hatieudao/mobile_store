
const {models} = require('../../models');

exports.productList = (page, limit) => {
    const result = models.mobiles.findAll({
        include:
            [
                {
                    model: models.brands,
                    as: "brand"
                },
                {
                    model: models.pictures,
                    as: "pictures"
                }
            ],
        offset: (page - 1) * limit,
        limit: limit
    });

    return result;

}