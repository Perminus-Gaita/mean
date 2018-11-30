const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const config = require('./config');

const localLogin = new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  let user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
    return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
  }
  user = user.toObject();
  delete user.hashedPassword;
  done(null, user);
});

const jwtLogin = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}, async (payload, done) => {
  let user = await User.findById(payload._id);
  if (!user) {
    return done(null, false);
  }
  user = user.toObject();
  delete user.hashedPassword;
  done(null, user);
});

passport.use(jwtLogin);
passport.use(localLogin);

module.exports = passport;


/*
The purpose of passport.session middleware is to deserialize user object from session using  passport.deserializeUser function 
(that you define in your passport configuration). When user first authenticates itself, its user object is serialized and stored 
in the session. On each following request, the middleware deserialize the user and populates req.user object.
*/
