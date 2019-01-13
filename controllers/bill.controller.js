const Products = require('../models/products.model');
const Producers = require('../models/producers.model');
const Bills = require('../models/bills.model');
const Users = require('../models/user.model');

module.exports.index = async (req, res) => {
  const products = await Products.find();
  const producers = await Producers.find();
  const { authId } = req.params;
  const user = await Users.findById(authId);
  let bills = await Bills.find();
  bills = bills.filter(b => b.authId === authId);
  if (!user) {
    res.render('/');
  }
  res.render('bill/index', {
    producers,
    products,
    bills,
    user,
    authId,
  });
};

module.exports.deleteBill = async (req, res) => {
  await Bills.findByIdAndDelete(req.body.billId);
  res.redirect(`/bill/${req.body.userId}`);
};
