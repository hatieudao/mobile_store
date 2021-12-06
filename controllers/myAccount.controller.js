const authService = require('../services/authService');
const bcrypt = require("bcrypt");

exports.myAccount = async (req, res) => {
    const {username} = req.params;
    const userInfo = await authService.getUserbyUsername(username);
    res.render('myAccount', {userInfo});
}

exports.updateAccount = async (req, res) => {
    const {deleteAccount} = req.body;
    const {username} = req.params;
    if (deleteAccount !== undefined) {
        await authService.delAccount(username);
        req.logout();
        return res.redirect('/');
    }

    const {linkPicture} = req.body;
    const {fullName, phoneNumber, address} = req.body;
    const {currentPassword, newPassword, confirmPassword} = req.body;

    if (linkPicture !== undefined) {
        await authService.addPicture(username, linkPicture);
    }
    if (fullName !== undefined && phoneNumber !== undefined && address !== undefined) {
        await authService.updateUser(username, fullName, phoneNumber, address);
    }

    const userInfo = await authService.getUserbyUsername(username);


    let message;
    if (currentPassword !== undefined && newPassword !== undefined && confirmPassword !== undefined) {
        if (newPassword !== confirmPassword) {
            message = "Vui lòng kiểm tra lại mật khẩu";
        } else {
            const match = await validPassword(userInfo, currentPassword);
            if (match) {
                await authService.updatePassword(username, newPassword);
                message = "Cập nhật thành công";
            } else {
                message = "Mật khẩu không đúng";
            }
        }
    }

    res.render('myAccount', {userInfo, message});
}

async function validPassword(user, password) {
    return bcrypt.compare(password, user.password);
}
