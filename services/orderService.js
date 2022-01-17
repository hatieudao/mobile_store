const {where} = require('sequelize/dist');
const {models} = require('../models');

exports.getOrderByUserId = (user_id) => {
    try {
        return models.orders.findOne(
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

exports.addOrderByUserId = async (user_id) => {
    const maxId = await models.orders.max('id');

    return await models.orders.create({
        id: maxId + 1,
        user_id: user_id
    })
}

/*exports.getorderByUserId = (user_id) => {
    return models.orders.findOne({
        include: [
            {model: models.order_details, require: true, as: 'order' }
        ],
        where: ({user_id})
    })
};*/


