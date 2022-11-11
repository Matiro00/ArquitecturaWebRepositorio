const express = require('express');
const userRoot = require('./src/routes/user.roots.js');
const bookRoot = require('./src/routes/book.roots.js');
const checkoutRoot = require('./src/routes/checkout.roots.js');
const app = express();
const session = require('express-session');

app.use(express.json());
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true,
  }))
app.use(userRoot);
app.use(bookRoot);
app.use(checkoutRoot);
app.listen(3000);

console.log('Server levantado con port 3000');