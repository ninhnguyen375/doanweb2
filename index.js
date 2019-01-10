const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

//get route
const homeRoute = require("./routes/home.route")
const cartRoute = require("./routes/cart.route")
const productRoute = require("./routes/product.route")

// connect to mongodb
// let dblink = "mongodb://ninhnguyen375:ninhnguyen3755@ds127634.mlab.com:27634/salesweb"
let dblink_local = "mongodb://127.0.0.1:27017/webbanhangdb"
//  ||
// "mongodb://127.0.0.1:27017/webbanhangdb"
mongoose.connect(dblink_local, { useNewUrlParser: true })
let db = mongoose.connection

//check connection
db.once('open', () => console.log('Connected to MongoDB'))
//check error
db.on('error',(err) => {
  console.log(err)
})

// init app
const app = express()

//public dir
app.use('/public', express.static('public/'));
app.use(express.static('public'));

//view pug
app.set('view engine', 'pug');
app.set('views', './views')

//use body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//use route
app.use('/', homeRoute)
app.use('/cart', cartRoute)
app.use('/product', productRoute)


//Listen Port
app.listen(3001, () => {
  console.log('Server listening on port ' + 3001);
});