const fs = require('fs');

async function fetchPage() {
  try {
    const res = await fetch("https://scrapc.com/news/delhi-scrap-price-today/", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    const html = await res.text();
    fs.writeFileSync("scraper_test.html", html);
    console.log("Downloaded successfully. Size:", html.length);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

fetchPage();
