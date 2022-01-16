const jwt = require('jsonwebtoken');

exports.createToken = (user) => {
  const { id, username } = user;
  return jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
