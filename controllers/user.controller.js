const Users = require('../models/user.model');
const Producers = require('../models/producers.model');

module.exports.signup = async (req, res) => {
  res.render('user/signup');
};

module.exports.login = (req, res) => {
  res.render('user/login');
};

module.exports.postLogin = async (req, res) => {
  const { password, email } = req.body;
  const producers = await Producers.find();
  const user = await Users.find({ user_email: email, user_password: password });
  if (user[0]) {
    res.render('user/index', {
      producers,
      user,
    });
  } else {
    const err = 'Account incorrect';
    res.render('user/login', {
      err,
      password,
      email,
    });
  }
};

module.exports.postSignup = async (req, res) => {
  const newUser = req.body;
  await Users.insertMany(newUser);
  res.redirect('/');
};
