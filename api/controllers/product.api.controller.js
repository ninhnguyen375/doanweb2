const Products = require('../../models/products.model');

module.exports.index = async (req, res) => {
  const products = await Products.find();
  const datas = {
    data: products,
  };
  res.json(datas);
};
