const Property = require('../models/propertyModel');

// CREATE property
exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all properties
exports.getProperties = async (req, res) => {
  const data = await Property.find();
  res.json(data);
};

// GET single property
exports.getProperty = async (req, res) => {
  const data = await Property.findById(req.params.id);
  res.json(data);
};

// DELETE property
exports.deleteProperty = async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};