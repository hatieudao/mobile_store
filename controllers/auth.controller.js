const authService = require('../services/authService');

exports.register = async (req, res) => {
    const {username, fullName, password, reTypePassword} = req.body;

    try {
        if (!username) {
            res.render('register', {message: 'Vui lòng kiểm tra tên đăng nhập'});
        } else if (!password || (password !== reTypePassword)) {
            res.render('register', {message: 'Mật khẩu không khớp, vui lòng kiểm tra lại'});
        }
        else {
            await authService.register(req.body);
            //res.redirect('/login');

            const user = {
                username: username,
                full_name: fullName
            };

            req.login(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/');
            });
        }
    } catch (error) {
        //duplicate user
        res.render('register', {message: `đã tồn tại ${username}, vui lòng nhập tên khác`});
    }
}