require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

// get route
const homeRoute = require('./routes/home.route');
const cartRoute = require('./routes/cart.route');
const productRoute = require('./routes/product.route');
const userRoute = require('./routes/user.route');
const billRoute = require('./routes/bill.route');
const searchRoute = require('./routes/search.route');
const adminRoute = require('./routes/admin.route');

// API
const apiProductRoute = require('./api/routes/product.api.route');
const apiUserRoute = require('./api/routes/user.api.route');

const PORT = process.env.PORT || 3000 || 8080;
// ---------- local
// const mongodb = 'mongodb://127.0.0.1:27017/webbanhangdb';
// mongoose.connect(
//   mongodb,
//   { useNewUrlParser: true },
// );
// ---------- online
mongoose.connect(
process.env.MONGO_URL,
{ useNewUrlParser: true },
);

const db = mongoose.connection;

// check connection
db.once('open', () => console.log('Connected to MongoDB'));
// check error
db.on('error', (err) => {
  console.log(err);
});

// init app
const app = express();

// public dir
app.use('/public', express.static('public/'));
app.use('/uploads', express.static('uploads/'));
app.use(express.static('public'));
app.use(express.static('uploads'));

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
app.use('/bill', billRoute);
app.use('/admin', adminRoute);

// API
app.use('/api/product', apiProductRoute);
app.use('/api/user', apiUserRoute);


// Listen Port
app.listen(PORT, () => {
  console.log(PORT);
});
