const express = require('express');
const userRoot = require('./src/routes/user.roots.js');
const bookRoot = require('./src/routes/book.roots.js');
const checkoutRoot = require('./src/routes/checkout.roots.js');
const bodyParser = require('body-parser')
const app = express();

app.use(express.json());
app.use(userRoot);
app.use(bookRoot);
app.use(checkoutRoot);
app.get('/', (req, res) => res.send('si'));

app.listen(3000);
console.log('Server levantado con port 3000');