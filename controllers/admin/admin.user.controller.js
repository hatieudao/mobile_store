const userService = require('../../services/admin/admin.user.service');

exports.userList = async (req, res) => {
    const users = await userService.userList();
    res.render('admin/user/userList', { title: 'user List', layout: 'admin/layout.hbs', users });
}