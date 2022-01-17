const {where} = require('sequelize/dist');
const {models} = require('../models');

exports.list = () => models.cart.findAll();

exports.getCartByUserId = (user_id) => {
    try {
        return models.cart.findOne(
            {
                where: ({user_id}),
                raw: true
            }
        )
    } catch (e) {
        console.log(e);
        return false;
    }
}

exports.addCartByUserId = async (user_id) => {
    const maxId = await models.cart.max('id');

    return await models.cart.create({
        id: maxId + 1,
        user_id: user_id
    })
}

/*exports.getCartByUserId = (user_id) => {
    return models.cart.findOne({
        include: [
            {model: models.cart_details, require: true, as: 'cart' }
        ],
        where: ({user_id})
    })
};*/


