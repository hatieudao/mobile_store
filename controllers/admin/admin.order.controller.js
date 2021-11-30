const orderService = require('../../services/admin/admin.order.service');

exports.orderList = async (req, res) => {
    const orders = await orderService.orderList();
    res.render('admin/order/orderList', { title: 'order List', layout: 'admin/layout.hbs', orders });
}