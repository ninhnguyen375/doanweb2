const Products = require('../models/products.model');
const Producers = require('../models/producers.model');
const Cart = require('../models/cart.model');

module.exports.index = async (req, res) => {
  const cart = await Cart.find();
  const products = await Products.find();
  const producers = await Producers.find();
  res.render('cart/index', {
    cart,
    products,
    producers,
  });
};

module.exports.removeCart = async (req, res) => {
  const idToDeleted = req.params.id;
  await Cart.findByIdAndDelete(idToDeleted);
  res.redirect('/cart');
};
