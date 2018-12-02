const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// define model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// before saving model, encrypt pass
userSchema.pre('save', function (next) {
  // get access to the user model
  const user = this;

  // generate salt then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash/encrypt password using the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      //overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePasswod, callback) {
  bcrypt.compare(candidatePasswod, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
}

// create the model class
const ModelClass = mongoose.model('user', userSchema);

// export the model
module.exports = ModelClass;
