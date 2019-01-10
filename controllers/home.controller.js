const Products = require("../models/products.model")
const Producers = require("../models/producers.model")
module.exports.index = async (req,res) => {
  const querys = req.query
  const producers = await Producers.find()
  let products = []
  if(querys.producer){
    products = await Products.find({ producer: querys.producer})
  }else{
    products = await Products.find()
  }
  res.render('home/index',{
    products: products,
    producers: producers,
    querys: querys
  })
}