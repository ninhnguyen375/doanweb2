const Users = require("../models/user.model")
const Producers = require("../models/producers.model")


module.exports.index = async (req, res) => {
  const id = req.params.id
  if ((id == 'login')) {
    res.render('user/login')
  } 
  if ((id == 'signup')) {
    res.render('user/signup')
  }
  const user = await Users.findById(id)
  const producers = await Producers.find()
  res.render('user/index', {
    user: user,
    producers: producers
  })
}


module.exports.signup = async (req, res) => {
  res.render('user/signup')
}


module.exports.login = (req, res) => {
  res.render('user/login')
}


module.exports.postLogin = async (req, res) => {
  const password = req.body.password
  const email = req.body.email
  const producers = await Producers.find()
  const user = await Users.find({ user_email: email, user_password: password })
  if (user) {
    res.render('user/index', {
      user: user,
      producers: producers
    })
  }
}

module.exports.postSignup = async (req, res) => {
  const newUser = req.body
  await Users.insertMany(newUser)
  res.redirect('/')
}