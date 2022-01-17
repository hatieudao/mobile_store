const { where } = require('sequelize/dist');
const { models } = require('../models');

exports.getCartDetailByCartId = (cart_id) => {
  try {
    const cart = models.cart_details.findAll(
      {
        where: ({ cart_id }),
        raw: true
      }
    )

    return cart;
  } catch (e) {
    console.log(e);
    return false;
  }

}

exports.removeItemById = async (id) => {
  try {
    await models.cart_details.destroy({
      where: {
        id: id
      }
    });
  } catch (error) {
    throw new Error('error delete');
  }
}

exports.updateQuantityCartDetailById = async (id, quantity) => {
  try {
    await models.cart_details.update({
      quantity: quantity
    },
      {
        where: {
          id: id
        }
      });
  }
  catch (e) {
    console.log(e);
  }
}

module.exports.addCartDetail = async (cart_id, option_id) => {
  const maxId = await models.cart_details.max('id');
  try {
    await models.cart_details.create({
      id: maxId + 1,
      cart_id: cart_id,
      option_id: option_id,
      quantity: 1
    })
  } catch (e) {
    console.log(e);
  }
}
