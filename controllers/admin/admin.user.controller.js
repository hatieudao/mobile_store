const userService = require('../../services/admin/admin.user.service');
const productService = require("../../services/admin/admin.product.service");

exports.userList = async (req, res) => {
    const users = await userService.userList();
    res.render('admin/user/userList', { title: 'user List', layout: 'admin/layout.hbs', users });
}

