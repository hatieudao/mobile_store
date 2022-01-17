const orderService = require('../services/orderService');
const orderDetailService = require('../services/orderdetailService');
const cartDetaiService = require('../services/cartdetailService');
const cartService = require('../services/cartService');
const userService = require('../services/userServices')
const bcrypt = require('bcrypt');

const {models} = require("../models");


module.exports.getOrder = async (req, res, next) => {
    res.render('checkout');
}

module.exports.addOrderOfUser = async (req, res, next) => {
    const user_id = req.user.id;

    const password = req.body.password;
    const userInfo = await userService.getUserbyId(user_id);

    const validPass = await bcrypt.compare(password, userInfo.password);


    if (validPass){
        let order = await orderService.getOrderByUserId(user_id);

        if (order === null || order === false) {
            await orderService.addOrderByUserId(user_id);
            order = await orderService.getOrderByUserId(user_id);
        }

        const cart = await cartService.getCartByUserId(user_id);
        if (cart !== null || cart !== false){
            const detail_carts = await cartDetaiService.getCartDetailByCartId(cart.id);

            for (let detail_cart of detail_carts) {
                await orderDetailService.addOrderDetail(order.id, detail_cart.option_id, detail_cart.quantity);
            }

            res.json('success');
        }
    }
    else {
        res.json('Invalid Password');
    }

}

