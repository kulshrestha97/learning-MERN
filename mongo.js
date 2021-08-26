const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://kulshrestha97:Password_123@cluster0.w9hnd.mongodb.net/productsDB?retryWrites=true&w=majority";
const createProduct = async (req, res, next) => {
    const newProduct = {
      name: req.body.name,
      price: req.body.price
    };
    const client = new MongoClient(url)
  
      // This way of writing is called as continuous passing, need to study more about this.
      await client.connect(
          (error) => {
              if(!error) {
                  const db = client.db();
                  const result = db.collection('products').insertOne(newProduct);
                  res.json({message: newProduct});
                } else {
                    res.json({message: error})
                }
          }
      )
    
    client.close();
  };

const getProducts = async (req, res, next) => {}

exports.getProducts = getProducts;
exports.createProduct = createProduct;