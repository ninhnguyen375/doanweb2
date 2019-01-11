const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

// get route
const homeRoute = require('./routes/home.route');
const cartRoute = require('./routes/cart.route');
const productRoute = require('./routes/product.route');
const userRoute = require('./routes/user.route');
const searchRoute = require('./routes/search.route');

// connect to mongodb
// let dblink = "mongodb://ninhnguyen375:ninhnguyen3755@ds127634.mlab.com:27634/salesweb"
const dbLinkLocal = 'mongodb://127.0.0.1:27017/webbanhangdb';
//  ||
// "mongodb://127.0.0.1:27017/webbanhangdb"
mongoose.connect(
  dbLinkLocal,
  { useNewUrlParser: true },
);
// init app
const app = express();

// public dir
app.use('/public', express.static('public/'));
app.use(express.static('public'));

// view pug
app.set('view engine', 'pug');
app.set('views', './views');

// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use route
app.use('/', homeRoute);
app.use('/cart', cartRoute);
app.use('/product', productRoute);
app.use('/user', userRoute);
app.use('/search', searchRoute);

// Listen Port
app.listen(3000);
