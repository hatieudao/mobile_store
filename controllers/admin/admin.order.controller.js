const orderService = require('../../services/admin/admin.order.service');
const brandService = require("../../services/admin/admin.brand.service");
const productService = require("../../services/admin/admin.product.service");

exports.orderList = async (req, res) => {
    const data = req.query;

    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit) || 10;

    //filter
    //Lấy các giá trị filter
    const filter = {
        orderId: data.orderId,
        customerId: data.customerId,
        customerUsername: data.customerUsername,
        customerPhoneNumber: data.customerPhoneNumber,
        state: ((data.state) === '0') ? undefined : data.state,
        minCreatedDate: data.minCreatedDate || new Date(2021, 0, 1),
        maxCreatedDate: data.maxCreatedDate || new Date(),
    }



    const allOrders = await orderService.orderList(page,limit, filter, true);

    const orders = allOrders.rows;

    const count = allOrders.count;


    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.render('admin/order/orderList', { title: 'order List', layout: 'admin/layout.hbs', orders, pagination, filter});
}