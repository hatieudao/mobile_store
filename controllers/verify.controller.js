const jwt = require("jsonwebtoken");
const verifyService = require('../services/verify.service');

exports.verifyToken = async (req, res) => {
  const { token } = req.params;
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      else {
        const updatedUser = await verifyService.verifyUser(user.id, user.uid);
        res.render('verify', { username: user.username });
      }
    })
  } catch (error) {
    console.log(error)
  }
}
