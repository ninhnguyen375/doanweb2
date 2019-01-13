const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_name: String,
  user_password: String,
  user_phone: String,
  user_permission: String,
  user_email: String,
});
const Users = mongoose.model('Users', userSchema, 'Users');
module.exports = Users;
