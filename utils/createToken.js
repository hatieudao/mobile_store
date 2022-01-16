const jwt = require('jsonwebtoken');

exports.createToken = (user) => {
  const { id, username, uid } = user;
  return jwt.sign({ id, username, uid }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
