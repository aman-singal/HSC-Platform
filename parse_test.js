const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scraper_test.html', 'utf8');
const $ = cheerio.load(html);

const tables = $('table');
console.log("Found tables:", tables.length);

tables.each((i, table) => {
  $(table).find('tr').each((j, tr) => {
    const row = [];
    $(tr).find('th, td').each((k, td) => {
      row.push($(td).text().trim());
    });
    console.log(`Row ${j}:`, row.join(' | '));
  });
});
