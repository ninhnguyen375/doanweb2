const Products = require('../models/products.model');
const Producers = require('../models/producers.model');

module.exports.index = async (req, res) => {
  const querys = req.query;
  const producers = await Producers.find();
  let products = [];
  if (querys.producer) {
    products = await Products.find({ producer: querys.producer });
    res.render('home/category', {
      products,
      producers,
      querys,
    });
  } else if (querys.search) {
    const temps = await Products.find();
    products = temps.filter(
      product => product.product_name
        .toLowerCase()
        .indexOf(querys.search.toLowerCase()) !== -1,
    );
    res.render('home/index', {
      products,
      producers,
      querys,
    });
  } else {
    products = await Products.find();
    res.render('home/index', {
      products,
      producers,
      querys,
    });
  }
};
