const {where} = require('sequelize/dist');
const {models} = require('../models');


module.exports.addOrderDetail = async (order_id, option_id, quantity) => {
    const maxId = await models.order_details.max('id');
    try {
        return await models.order_details.create({
            id: maxId + 1,
            order_id: order_id,
            option_id: option_id,
            quantity: quantity
        })
    }catch (e){
        console.log(e);
        return false;
    }
}
