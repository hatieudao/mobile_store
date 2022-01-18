const mobileService = require('../services/mobileService');
const cartService = require('../services/cartService');
const cartDetailService = require('../services/cartdetailService');
const optionService = require('../services/optionService');
const { models } = require("../models");


module.exports.getCart = async (req, res, next) => {
  res.render('cart');
}

module.exports.getMyCart = async (req, res, next) => {

  const userid = req.user.id;

  if (userid === undefined) {
    console.log('user undefind');
    res.json(null);
  }
  else {

    let cart = await cartService.getCartByUserId(userid);

    if (cart === null || cart == false) {
      await cartService.addCartByUserId(userid);
      res.json(null);
    }
    else {

      const cart_details = await cartDetailService.getCartDetailByCartId(cart.id);

      for (let cart_detail of cart_details) {
        const option = await optionService.getOptionsById(cart_detail.option_id);
        const mobile = await mobileService.getMobileById(option.mobile_id);
        cart_detail.option = option;
        cart_detail.mobile = mobile[0];
      }

      res.json(cart_details);
    }
  }
}

module.exports.removeItem = async (req, res, next) => {

  const id = req.body.id;
  await cartDetailService.removeItemById(id);

}

module.exports.addItem = async (req, res, next) => {

  const mobile_id = req.body.mobile_id;
  const userid = req.user.id;
  let user_cart = await cartService.getCartByUserId(userid);

  if (user_cart === null || user_cart === false) {
    await cartService.addCartByUserId(userid);
    user_cart = await cartService.getCartByUserId(userid);
  }

  const cart_details = await cartDetailService.getCartDetailByCartId(user_cart.id);
  const option = await optionService.getFirstOptionsByMobileId(mobile_id);

  if (option !== null) {
    let isUpdate = 0;
    for (let cart_detail of cart_details) {
      if (cart_detail.option_id == option.id) {
        await cartDetailService.updateQuantityCartDetailById(cart_detail.id, cart_detail.quantity + 1);
        isUpdate = 1;
        break;
      }
    }

    if (isUpdate == 0) {
      await cartDetailService.addCartDetail(user_cart.id, option.id);
    }
  }

}

module.exports.updateCartLogin = async (req, res, next) => {

  const mobile_id = req.body.mobile_id;
  const quantity = req.body.quantity;
  const userid = req.user.id;
  let user_cart = await cartService.getCartByUserId(userid);

  if (user_cart === null || user_cart === false) {
    await cartService.addCartByUserId(userid);
    user_cart = await cartService.getCartByUserId(userid);
  }

  const cart_details = await cartDetailService.getCartDetailByCartId(user_cart.id);
  const option = await optionService.getFirstOptionsByMobileId(mobile_id);

  if (option !== null) {
    let isUpdate = 0;
    for (let cart_detail of cart_details) {
      if (cart_detail.option_id == option.id) {
        await cartDetailService.updateQuantityCartDetailById(cart_detail.id, cart_detail.quantity + quantity);
        isUpdate = 1;
        break;
      }
    }

    if (isUpdate == 0) {
      await cartDetailService.addCartDetail(user_cart.id, option.id);
    }
  }

}

