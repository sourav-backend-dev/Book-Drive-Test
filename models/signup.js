const mongoose = require('mongoose');

// userschema as provided in assignment instructions 
const SignupSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String
});

const Signup = mongoose.model('Signup', SignupSchema);

module.exports = Signup;
