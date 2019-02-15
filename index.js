require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// get route
const homeRoute = require('./routes/home.route');
const cartRoute = require('./routes/cart.route');
const productRoute = require('./routes/product.route');
const userRoute = require('./routes/user.route');
const billRoute = require('./routes/bill.route');
const searchRoute = require('./routes/search.route');
// const adminRoute = require('./routes/admin.route');

// API
const apiProductRoute = require('./api/routes/product.api.route');
const apiUserRoute = require('./api/routes/user.api.route');
const apiBillRoute = require('./api/routes/bill.api.route');
const apiProducerRoute = require('./api/routes/producer.api.route');

const PORT = process.env.PORT || 3001 || 8080;
// ---------- local
const mongodb = 'mongodb://127.0.0.1:27017/webbanhangdb';
mongoose.connect(mongodb, { useNewUrlParser: true });
// ---------- online
// mongoose.connect(
//   process.env.MONGO_URL,
//   { useNewUrlParser: true },
// );

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
app.use(express.static('./admin'));

// view pug
app.set('view engine', 'pug');
app.set('views', './views');

// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use(cors());

// use route
app.use('/home', homeRoute);
app.use('/cart', cartRoute);
app.use('/product', productRoute);
app.use('/user', userRoute);
app.use('/search', searchRoute);
app.use('/bill', billRoute);
// app.use('/admin', adminRoute);
app.get('/admin', (req, res) => {
  res.sendFile('./admin/index.html', { root: __dirname });
});
// app.get('*', (req, res) => {
//   res.send('404 :)))');
// });

// API
app.use('/api/products', apiProductRoute);
app.use('/api/users', apiUserRoute);
app.use('/api/bills', apiBillRoute);
app.use('/api/producers', apiProducerRoute);

// Listen Port
app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});
