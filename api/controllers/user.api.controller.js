const Users = require('../../models/user.model');

module.exports.index = async (req, res) => {
  const users = await Users.find();
  const datas = {
    data: users,
  };
  res.json(datas);
};

module.exports.postSignIn = async (req, res) => {
  if (!req.body || !req.body.user_email || !req.body.user_password) {
    res.send({ err: 'Does not have enough data' });
  } else {
    try {
      const users = await Users.find({
        user_email: req.body.user_email,
        user_password: req.body.user_password,
      });
      if (!users[0]) {
        res.send({ err: 'Account Does Not Exist' });
      } else if (users[0].user_group !== 'admin') {
        res.send({ err: 'This account is not Admin Permission' });
      } else {
        res.send({ adminDetails: users[0] });
      }
    } catch (err) {
      res.send({ err: err.message });
    }
  }
};

module.exports.getEmail = async (req, res) => {
  const userEmails = await Users.find().select('user_email');
  res.json(userEmails);
};

module.exports.checkAdmin = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user.user_group === 'admin') {
      res.send({ isAdmin: true });
    } else {
      res.send({ err: 'This user Is not admin' });
    }
  } catch (err) {
    res.send({ err: err.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (req.params.id) {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.send('success');
    } catch (err) {
      res.send({ err });
    }
  } else {
    res.send({
      err: 'invalid id',
    });
  }
};

module.exports.editUser = async (req, res) => {
  const { id } = req.params;
  let users = await Users.find();
  if (!req.body.user_name) {
    res.send({ err: 'Does not have any form' });
  } else if (id) {
    const user = await Users.findById(id);
    if (!user) {
      res.send({ err: 'Does not have this user' });
    } else {
      const u = req.body;
      users = users.filter(item => item.user_email !== user.user_email);
      const validEmail = users.find(item => item.user_email === u.user_email);
      if (validEmail) res.send({ err: 'Duplicate email' });
      else {
        await Users.findByIdAndUpdate(id, {
          user_name: u.user_name,
          user_password: u.user_password,
          user_phone: u.user_phone,
          user_group: u.user_group,
          user_email: u.user_email,
          user_permission: u.user_permission,
        });
        res.send('Success');
      }
    }
  } else {
    res.send({ err: 'Invalid id' });
  }
};

module.exports.getAdminPermission = async (req, res) => {
  const user = await Users.findById(req.params.id);
  return res.send({ admin: user.user_permission });
};

function validateEmail(email) {
  return email.indexOf('@') !== -1;
}
module.exports.postSignup = async (req, res) => {
  const users = await Users.find();
  const reqUser = req.body;
  const isDuplicatedEmail = false;
  let isEmail = false;
  let foundUser = users.find(user => user.user_email === reqUser.user_email);
  if (foundUser) {
    isDuplicatedEmail = true;
  }
  if (validateEmail(reqUser.user_email)) {
    isEmail = true;
  }
  if (isDuplicatedEmail || !isEmail) {
    res.render('user/signup', { error: 'Fail to sign up, please try again' });
  } else {
    const obj = {
      user_name: reqUser.user_name,
      user_phone: reqUser.user_phone,
      user_email: reqUser.user_email,
      user_password: reqUser.user_password,
      user_group: reqUser.user_group,
      user_permission: reqUser.user_permission,
    };
    await Users.insertMany(obj);
    res.redirect('/user/login');
  }
};