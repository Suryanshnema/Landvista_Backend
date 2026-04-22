const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeCBRE() {
  const response = await axios.get('https://www.cbre.com/');
  const $ = cheerio.load(response.data);

  let data = [];

  $('h2').each((i, el) => {
    data.push($(el).text().trim());
  });

  return data;
}

module.exports = scrapeCBRE;