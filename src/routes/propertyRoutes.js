const express = require('express');
const router = express.Router();

const {
  createProperty,
  getProperties,
  getProperty,
  deleteProperty
} = require('../controllers/propertyController');

router.post('/property', createProperty);
router.get('/property', getProperties);
router.get('/property/:id', getProperty);
router.delete('/property/:id', deleteProperty);

module.exports = router;