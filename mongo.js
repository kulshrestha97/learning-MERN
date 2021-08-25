const {MongoClient} = require('mongodb');
const url = "mongodb+srv://kulshrestha97:password_123@cluster0.w9hnd.mongodb.net/products_db?retryWrites=true&w=majority"
const createProduct = async (req,res,next) => {}

const getProducts = async (req, res, next) => {}

exports.getProducts = getProducts;
exports.createProduct = createProduct;