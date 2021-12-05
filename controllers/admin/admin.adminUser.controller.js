const userService = require('../../services/admin/admin.user.service');
const productService = require("../../services/admin/admin.product.service");
const configurationService = require("../../services/admin/admin.configuration.service");
const optionService = require("../../services/admin/admin.option.service");
const pictureService = require("../../services/admin/admin.picture.service");

exports.adminUserList = async (req, res) => {
    const { page, limit } = req.query;

    const filter = {
        username: req.query.username,
        fullName: req.query.fullName,
        phoneNumber: req.query.phoneNumber
    }


    //Lấy url gốc -> cắt chuỗi "page=" ra (nếu có)
    const oriUrl = req.originalUrl;
    const splitIndex = oriUrl.lastIndexOf("page=");
    const url = splitIndex > -1 ? oriUrl.slice(0,splitIndex-1) : oriUrl;

    //Kiểm tra xem trên có các query khác hay koS
    const selectPage = url.lastIndexOf('?') > -1 ? '&page=' : '?page';




    //Lấy products
    const dataService = await userService.adminUserList(page || 1,limit || 10, filter);

    //products
    const adminUsers = dataService.rows;
    //Số lượng các products
    const countAdminUsers = dataService.count;


    const curPage = parseInt(page) || 1;
    const curLimit = parseInt(limit) || 10;

    //Số lượng page = ceil của (tổng sản phảm / số lượng sản phẩm trên 1 trang)
    const countPage = Math.ceil(countAdminUsers/curLimit);
    const pagination = {
        curPage: curPage,
        prevPageLink: curPage > 1 ? url + selectPage + (curPage - 1) : url + selectPage + curPage,
        nextPageLink: curPage < countPage ? url + selectPage + (curPage + 1) : url + selectPage + curPage,
        limit: parseInt(limit) || 10
    }

    res.render('admin/adminUser/adminUserList', { title: 'user List', layout: 'admin/layout.hbs', adminUsers, pagination });
}


exports.addAdminUserPage = (req, res) => {
    res.render('admin/adminUser/adminUserAdd', { title: 'Product', layout: 'admin/layout.hbs' });
}


exports.addAdminUser = async (req, res) => {
    const { username, password, fullName, address, phoneNumber, avatar } = req.query;

    const adminUser = await userService.findAdminUserByUsername(username);
    if(adminUser) {
        const error = "Tên đăng nhập đã tồn tại";
        res.render('admin/adminUser/adminUserAdd', { title: 'Product', layout: 'admin/layout.hbs', username, password, fullName, address, phoneNumber, avatar,error});
    }
    else {
        const addNewAdminUser = await userService.addAdminUser(username, password, fullName, address, avatar, phoneNumber);
        console.log(addNewAdminUser);
        const id = addNewAdminUser.id;
        res.redirect('/admin/adminUser/'+id);
    }
}

exports.adminAccount = async (req, res) => {

    const id = parseInt(req.params.id);
    console.log('id = ', id);

    const adminUser = await userService.findAdminUserById(id);

    res.render('admin/adminUser/adminAccount', { title: 'Product', layout: 'admin/layout.hbs', adminUser});
}


exports.adminCurrentAccount = async (req, res) => {

    const currentAdminUser = req.user;
    const id = parseInt(currentAdminUser.id);
    console.log('id = ', id);

    const adminUser = await userService.findAdminUserById(id);

    res.render('admin/adminUser/adminAccount', { title: 'Product', layout: 'admin/layout.hbs', adminUser});
}
//
