const Users = require('../models/user.model');
const Producers = require('../models/producers.model');
const Products = require('../models/products.model');

module.exports.index = async (req, res) => {
  const querys = req.query;
  const producers = await Producers.find();
  const temps = await Products.find();
  let products = [];
  if (querys.search) {
    products = temps.filter(product => (
      product.product_name
        .toLowerCase()
        .trim()
        .indexOf(querys.search.toLowerCase().trim()) != -1
    ));
  }
  res.render('search/index', {
    querys,
    producers,
    products,
  });
};
