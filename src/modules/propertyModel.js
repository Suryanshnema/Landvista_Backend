const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  price: Number,
  location: String,
  image: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);