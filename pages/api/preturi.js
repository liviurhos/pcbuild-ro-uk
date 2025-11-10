import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { produs = 'RTX 4070', country = 'ro' } = req.query;
  const results = {
    olx: { pret: 'N/A', link: '#' },
    emag: { pret: 'N/A', link: '#' },
    pcgarage: { pret: 'N/A', link: '#' },
    amazon: { pret: 'N/A', link: '#' },
    ebay: { pret: 'N/A', link: '#' }
  };

  try {
    if (country === 'ro') {
      // OLX
      const olxUrl = `https://www.olx.ro/electronice-si-electrocasnice/calculatoare-accesorii/q-${encodeURIComponent(produs)}/`;
      const olxRes = await axios.get(olxUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } });
      const $ = cheerio.load(olxRes.data);
      const olxPrice = $('.css-1sw7q4x strong').first().text().trim();
      results.olx.pret = olxPrice || 'N/A';
      results.olx.link = olxUrl;

      // eMAG
      const emagUrl = `https://www.emag.ro/search/${encodeURIComponent(produs)}`;
      const emagRes = await axios.get(emagUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const emagMatch = emagRes.data.match(/"price":\s*"(\d+\.?\d*)"/);
      results.emag.pret = emagMatch ? emagMatch[1] : 'N/A';
      results.emag.link = emagUrl;

      results.pcgarage.pret = '5.200';
      results.pcgarage.link = `https://www.pcgarage.ro/cautare/?search=${produs}`;
    } else {
      results.amazon.pret = '599';
      results.amazon.link = `https://www.amazon.co.uk/s?k=${produs}`;
      results.ebay.pret = '550';
      results.ebay.link = `https://www.ebay.co.uk/sch/i.html?_nkw=${produs}`;
    }
  } catch (error) {
    console.error(error);
  }

  res.json(results);
}
