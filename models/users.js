const mongoose = require('mongoose');

// userschema as provided in assignment instructions 
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  licenseNo: String,
  age: Number,
  carDetails: {
    make: String,
    model: String,
    year: Number,
    platno: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
