const express = require("express");
const bodyParser = require("body-parser");
const controller = require("./mongo");
const url =
  "mongodb+srv://kulshrestha97:Password_123@cluster0.w9hnd.mongodb.net/places?retryWrites=true&w=majority";
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());

app.post("/products", controller.createProduct);

app.get("/products", controller.getProducts);

mongoose
  .connect(url)
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });
