const { sendEmailVerify } = require('../utils/sendEmailVerify');
exports.isVerified = (req, res, next) => {
  if (req.user?.status === "unlock") next();
  sendEmailVerify('trumbien2001@gmail.com');
  res.send("Please verify your email");
}
