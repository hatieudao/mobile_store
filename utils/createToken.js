const jwt = require('jsonwebtoken');

exports.ceateToken = (user) => {
  const { id, username } = user;
  return jwt.sign({ id, username }, process.env.JWT_SECRET);
}
