const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const dotenv = require('dotenv');
const flash = require('connect-flash');
const authRoute = require('./routes/auth');
const serviceRoute = require('./routes/services');
const database = require('./models');
const PORT = 3000;

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/images', express.static(path.join(__dirname, 'images')));
const MONGODB_URI = 'mongodb://127.0.0.1:27017/blockChain';

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'session',
});

app.use(
  session({
    secret: 'thisismysecret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(flash());

app.use(authRoute);
app.use(serviceRoute);

database.onConnect(() => {
  app.listen(PORT, () => {
    console.log(`app is listening on http:://localhost:${PORT}`);
  });
});

