const { sendEmailVerify } = require('../utils/sendEmailVerify');
const { createToken } = require('../utils/createToken');
exports.isVerified = (req, res, next) => {
  if (req.user?.status === "unlock") next();
  console.log(req.user)
  res.render('verify-request', { link: `${process.env.DOMAIN}/verify`, layout: 'emptyLayout' })
}
