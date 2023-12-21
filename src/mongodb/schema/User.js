// const mongoose = require("mongoose");
const { Schema, model, models } = require('../mongoose');

const userSchema = Schema({
  userName: {
    type: String,
    required: [true, 'please add the user name'],
  },
  email: {
    type: String,
    required: [true, 'please add the email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please add the password'],
  },
  passwordConfirmation: {
    type: String,
    required: true,
  },
});

const User = model('User', userSchema);

module.exports = User;
// module.exports= mongoose.model("User", userSchema)
