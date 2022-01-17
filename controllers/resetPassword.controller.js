const authService = require('../services/authService');
const jwt = require("jsonwebtoken");
const resetPasswordService = require('../services/resetPassword.service');
const sender = require('../utils/sendEmailVerify');
const { createToken } = require('../utils/createToken');
exports.resetPassword = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await authService.getUserbyUsername(username);
    console.log(user);
    let errorAuth = "";
    if (!user) {
      errorAuth = 'Username is not exist';
    }
    else if (!user.email) {
      errorAuth = 'Email of this\'s username is not exist';
    }
    else {
      sender.sendEmailResetPassword(user.email, createToken(user));
      const pos = user.email.indexOf('@');
      let secure = '';
      for (let i = 0; i < pos - 2; ++i) {
        secure += '*';
      }
      const email = user.email.substring(0, 2) + secure + user.email.slice(pos);
      errorAuth = `Please check your email ${email}, also check spam`;
    }
    res.render('login/reset-password', { title: 'Forgot Password', errorAuth })

  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
}
exports.verifyToken = async (req, res) => {
  const { token } = req.params;
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      else {
        res.render('login/new-password', { token });
      }
    })
  } catch (error) {
    console.log(error)
  }
}
exports.updateNewPassword = async (req, res) => {
  try {
    const { password, reTypePassword, token } = req.body;
    if (password !== reTypePassword) {
      res.render('login/new-password', { errorAuth: 'Password not match' });
    }
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      else {
        await resetPasswordService.updatePassword(user.id, password);
        res.redirect('/login');
      }
    })
  } catch (error) {
    console.log(error)
  }
}

