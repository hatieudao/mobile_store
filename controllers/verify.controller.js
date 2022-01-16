const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res) => {
  const { token } = req.params;
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      else {
        res.json(user);
      }
    })
  } catch (error) {
    console.log(error)
  }
}
