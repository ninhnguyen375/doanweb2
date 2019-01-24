const Users = require('../../models/user.model');

module.exports.index = async (req, res) => {
  const users = await Users.find();
  res.json(users);
};
module.exports.getEmail = async (req, res) => {
  const userEmails = await Users.find().select('user_email');
  res.json(userEmails);
};
