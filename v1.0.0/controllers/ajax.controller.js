const Products = require('../models/products.model');
const Producers = require('../models/producers.model');

module.exports.getcategory = async (req, res) => {
  const querys = req.query;
  res.render('ajax/category', { producer, page });
};
