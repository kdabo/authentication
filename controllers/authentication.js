const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // sub is convention, and it stands for subject
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.response(422).send({ error: "You must provide email and password"});
  }

  // see if user with given email exists
  // user is a model - collection of users
  // https://mongoosejs.com/docs/api.html#model_Model.findOne
  // existingUser is an user with the email as the first argument
  User.findOne({ email: email}, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    // if user does exist, return an error
    if (existingUser) {
      // 422 unprocessable entity
      return res.status(422).send({ error: 'Email is in use'});
    }
    // if user with email does not exist, create and save user record
    // creating an user in the memory, not saving the user in DB
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      // respond to request indicating the user was created
      res.json({ token: tokenForUser(user)});
    });
  });
};