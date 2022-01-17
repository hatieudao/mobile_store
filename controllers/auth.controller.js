const authService = require('../services/authService');

exports.login = async (req, res) => {
  res.render('login', { errorLogin: req.query.errorLogin !== undefined });
}

exports.loginP = async (req, res) => {
  console.log("Auth fix");
  if (req.user)
    res.redirect('/');
  else
    res.redirect('/login');
}

exports.logout = async (req, res) => {
  req.logout();
  res.redirect('/');
}

exports.register = async (req, res) => {
  res.render('register');
}

exports.registerP = async (req, res) => {
  const { username, fullName, password, reTypePassword } = req.body;

  try {
    if (!username) {
      res.render('register', { message: 'Vui lòng kiểm tra tên đăng nhập' });
    } else if (!password || (password !== reTypePassword)) {
      res.render('register', { message: 'Mật khẩu không khớp, vui lòng kiểm tra lại' });
    } else {
      await authService.register(req.body);
      //res.redirect('/login');

      const userInfo = await authService.getUserbyUsername(username);

      const user = {
        id: userInfo.id,
        username: username,
        full_name: fullName,
        avatar: userInfo.avatar
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
    res.render('register', { message: `đã tồn tại ${username}, vui lòng nhập tên khác` });
  }
}
