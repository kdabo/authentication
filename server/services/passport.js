const passport = require('server/services/passport');
const User = require('../models/user');
const config = require('../../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// passport is more like ecosystem
// passport.strategy is a method for authenticating an user
// here is used 'passport-jwt' strategy (verifying user with a JWT)

// Create local strategy for signing in
const localOptions = { usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // Verify given username and password, call done with the user
  // if correct email and password
  // otherwise call done with false
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    // compare password - is 'passowrd' equal to user.password?
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
});

//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy
// payload argument is decoded jwt payload(userid and timestamp)
// done argument is callback function to call to authenticate weather user can successfully login or not
// (check if the user ID in the payload exists in the database)
// if not, call 'done' with the user,
// otherwise, call done without a user object
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub, function(err, user) {
    if(err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

//tell passort to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);