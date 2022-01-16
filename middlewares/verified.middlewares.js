const { sendEmailVerify } = require('../utils/sendEmailVerify');
const { createToken } = require('../utils/createToken');
exports.isVerified = (req, res, next) => {
  // if (req.user?.status === "unlock") next();
  // sendEmailVerify('trumbien2001@gmail.com');
  // res.send("Please verify your email");
  console.log(req.user);
  next();
}
