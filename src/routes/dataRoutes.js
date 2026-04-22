const express = require('express');
const router = express.Router();
    const scrapeCBRE = require('../services/scraper.js');

router.get('/data', async (req, res) => {
  try {
    const data = await scrapeCBRE();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;