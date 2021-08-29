const MongoClient = require("mongodb").MongoClient;
const Place = require("./models/place");
const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);

  // This way of writing is called as continuous passing, need to study more about this.
  await client.connect((error) => {
    if (!error) {
      const db = client.db();
      const result = db.collection("products").insertOne(newProduct);
      res.json({ message: newProduct });
    } else {
      res.json({ message: error });
    }
  });

  client.close();
};

const getProducts = async (req, res, next) => {
  // const client = new MongoClient(url);
  // let products;
  // await client.connect((error) => {
  //   if (!error) {
  //     const db = client.db();
  //     products = db.collection("products").find().toArray();
  //     res.json({ products });
  //   } else {
  //     res.json({ message: error });
  //   }
  // });
  let products = Place.find().then().catch();
};

exports.getProducts = getProducts;
exports.createProduct = createProduct;
