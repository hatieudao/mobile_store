const userService = require('../../services/admin/admin.user.service');
const productService = require("../../services/admin/admin.product.service");
const configurationService = require("../../services/admin/admin.configuration.service");
const optionService = require("../../services/admin/admin.option.service");
const pictureService = require("../../services/admin/admin.picture.service");

exports.adminUserList = async (req, res) => {

    const data = req.query;

    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit) || 10;

    const filter = {
        adminId: data.adminId,
        adminUserName: data.adminUserName,
        adminName: data.adminName,
        adminPhoneNumber: data.adminPhoneNumber,
        status: ((data.status) === '0') ? undefined : data.status,
        minCreatedDate: data.minCreatedDate || new Date(2021, 0, 1),
        maxCreatedDate: data.maxCreatedDate || new Date(),
    }

    // await userService.foo();

    const allAdminUser = await userService.adminUserList(page,limit, filter, true);

    //products
    const adminUsers = allAdminUser.rows;
    //Số lượng các products
    const count = allAdminUser.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.render('admin/adminUser/adminUserList', { title: 'user List', layout: 'admin/layout.hbs', adminUsers, pagination, filter });
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

exports.lockAllAdminUser = async (req, res) => {
    const lockALl = req.query.lockAll;

    if(lockALl){
        for (let adminUserId of lockALl)
        {
            await userService.lockAdminUser(adminUserId);
        }
    }

    res.redirect('/admin/adminUser');
}