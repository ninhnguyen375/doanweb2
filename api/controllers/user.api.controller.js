const Users = require('../../models/user.model');

module.exports.index = async (req, res) => {
  const users = await Users.find();
  res.json(users);
};
