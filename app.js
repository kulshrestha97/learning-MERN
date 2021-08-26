const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./mongo');

const app = express();

app.use(bodyParser.json());


app.post('/products', controller.createProduct);

app.get('/products');

app.listen(5000);