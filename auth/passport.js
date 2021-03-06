const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");

const { models } = require("../models");
const authService = require("../services/authService");

passport.use(new LocalStrategy(
  async function (username, password, done) {
    try {
      //const user = await models.users.findOne({where: {username}, raw: true});
      const user = await authService.getUserbyUsername(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const match = await validPassword(user, password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      if (user.status === 'lock') {
        return done(null, false, { message: 'Incorrect username.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

async function validPassword(user, password) {
  return bcrypt.compare(password, user.password);
}

passport.serializeUser(function (user, done) {
  const { id, username, full_name, avatar, uid, status, email } = user;
  done(null, { id, username, full_name, avatar, uid, status, email });

});

passport.deserializeUser(function (user, done) {
  return done(null, user);
});

module.exports = passport;
