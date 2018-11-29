const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "You must provide a username."
  },
  password: {
    type: String,
    trim: true,
    required: "You must provide a password."
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;