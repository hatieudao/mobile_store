const jwt = require("jsonwebtoken");
const verifyService = require('../services/verify.service');
const sender = require('../utils/sendEmailVerify');
const { createToken } = require('../utils/createToken');

exports.verifyToken = async (req, res) => {
  const { token } = req.params;
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      else {
        const updatedUser = await verifyService.verifyUser(user.id, user.uid);
        if (updatedUser[0] === 0) {
          console.log(updatedUser);
          res.sendStatus(403);
        }
        res.render('verify', { username: user.username, layout: 'emptyLayout' });
      }
    })
  } catch (error) {
    console.log(error)
  }
}
exports.sendEmailVertifyToUserEmail = async (req, res) => {
  if (!req.user) res.sendStatus(403);
  const user = req.user;
  const token = createToken(user);
  if (token === 'error') res.redirect('/login');
  console.log(user.email);
  sender.sendEmailVerify(user.email, token);
  res.render('check-your-mail', { username: user.username, layout: 'emptyLayout' });
}
