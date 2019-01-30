/* eslint-disable */
const Users = require('../models/user.model');
const Producers = require('../models/producers.model');
const Products = require('../models/products.model');

module.exports.index = async (req, res) => {
  const { id } = req.params;
  const user = await Users.find({ _id: id });
  const products = await Products.find();
  const producers = await Producers.find();
  if (user[0]) {
    res.render('user/index', {
      user,
      products,
      producers,
    });
  } else {
    res.send(`False to get user ${id}, User are not exist!`);
  }
};

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

function validateEmail(email) {
  return email.indexOf('@') !== -1;
}
module.exports.postSignup = async (req, res) => {
  // const newUser = req.body;
  // await Users.insertMany(newUser);
  // res.redirect('/user/login');
  const users = await Users.find();
  const reqUser = req.body;
  const isDuplicatedEmail = false;
  let isEmail = false;
  let foundUser = users.find(user => (user.user_email === reqUser.user_email));
  if (foundUser) {
    isDuplicatedEmail = true;
  }
  if (validateEmail(reqUser.user_email)){
    isEmail = true;
  }
  if(isDuplicatedEmail || !isEmail){
    res.render('user/signup', { error: 'Fail to sign up, please try again' });
  } else {
    await Users.insertMany(reqUser);
    res.redirect('/user/login');
  }
};
