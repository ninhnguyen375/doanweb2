/* eslint-disable */
const Products = require("../models/products.model");
const Producers = require("../models/producers.model");
const Cart = require("../models/cart.model");
const Bills = require("../models/bills.model");

module.exports.index = async (req, res) => {
  const cart = await Cart.find();
  const products = await Products.find();
  const producers = await Producers.find();
  res.render("cart/index", {
    cart,
    products,
    producers
  });
};

module.exports.removeCart = async (req, res) => {
  const idToDeleted = req.params.id;
  await Cart.findByIdAndDelete(idToDeleted);
  res.redirect("/cart");
};

module.exports.addBill = async (req, res) => {
  const theBill = JSON.parse(req.body.bill);
  await Bills.insertMany(theBill);
  await Cart.deleteMany({});
  let pro = [];
  for (let i = 0; i < theBill.details.proId.length; i += 1) {
    const proId = theBill.details.proId[i];
    const proQua = theBill.details.proQuantity[i];
    const obj = { proId, proQua };
    pro.push(obj);
  }
  pro.forEach(async p => {
    const curr = await Products.find({ product_id: p.proId });
    const newQua = curr[0].quantity - p.proQua;
    await Products.findOneAndUpdate(
      { product_id: p.proId },
      { quantity: newQua }
    );
  });

  res.redirect("/cart");
};
