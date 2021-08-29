// const mongoose = require('mongoose'); this is old way
const mongoose = require("mongoose"); // new way, reminds me of Python

const { Schema } = mongoose;

const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  address: { type: String, required: true },
});

module.exports = mongoose.model("Place", placeSchema);
