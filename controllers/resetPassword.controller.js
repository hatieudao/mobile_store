const authService = require('../services/authService');
const jwt = require("jsonwebtoken");
const verifyService = require('../services/verify.service');
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
// exports.verifyToken = async (req, res) => {
//   const { token } = req.params;
//   try {
//     jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
//       if (err) {
//         res.sendStatus(403);
//       }
//       else {
//         const updatedUser = await verifyService.verifyUser(user.id, user.uid);
//         if (updatedUser[0] === 0) {
//           console.log(updatedUser);
//           res.sendStatus(403);
//         }
//         res.render('verify', { username: user.username, layout: 'emptyLayout' });
//       }
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }
// exports.sendEmailVertifyToUserEmail = async (req, res) => {
//   if (!req.user) res.sendStatus(403);
//   const user = req.user;
//   const token = createToken(user);
//   if (token === 'error') res.redirect('/login');
//   console.log(user.email);
//   sender.sendEmailVerify(user.email, token);
//   res.render('check-your-mail', { username: user.username, layout: 'emptyLayout' });
// }
