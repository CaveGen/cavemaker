const mongoose = require('mongoose');

const SALT_WORK_FACTOR = 7;
const bcrypt = require('bcryptjs');


//does our schema need any other data on ech given user?
// the ID is created for each of them unique, but I forget exactly what it's called...

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true},
  savedMaps: {type: Object}
});


const User = mongoose.model('user', userSchema);

module.exports = User;