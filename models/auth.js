const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./user');

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      const user = await User.findOne({ where: { username: username } });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function(id, cb) {
  const user = await User.findByPk(id);
  cb(null, user);
});



module.exports = passport;
