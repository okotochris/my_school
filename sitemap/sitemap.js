const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');
const News = require('../schema/news.js');

async function generateSitemap() {
  const smStream = new SitemapStream({
    hostname: "https://www.myschoolresult.com",
  });

  const writeStream = createWriteStream(
    path.resolve("./public/sitemap.xml")
  );

  smStream.pipe(writeStream);

  // Static pages
  smStream.write({ url: "/", changefreq: "daily", priority: 1.0 });
  smStream.write({ url: "/about", changefreq: "weekly", priority: 0.8 });
  smStream.write({ url: "/contact", changefreq: "monthly", priority: 0.5 });
  smStream.write({ url: "/result_check_guide", changefreq: "monthly", priority: 0.5 });
  smStream.write({ url: "/neco", changefreq: "monthly", priority: 0.5 });
  smStream.write({ url: "/waec", changefreq: "monthly", priority: 0.5 });
  smStream.write({ url: "/jamb", changefreq: "monthly", priority: 0.5 });
  smStream.write({ url: "/post-utme", changefreq: "monthly", priority: 0.5 });
  smStream.write({ url: "/nabteb", changefreq: "monthly", priority: 0.5 });
  smStream.write({ url: "/news", changefreq: "daily", priority: 0.9 });

  // 🔥 Fetch ALL news articles (newest first)
  const articles = await News.find({})
    .sort({ fetchedAt: -1 })
    .lean();

  if (articles.length > 0) {
    articles.forEach((_, index) => {
      smStream.write({
        url: `/news_details/${index}`,
        changefreq: "daily",
        priority: 0.7,
      });
    });

    console.log(`📰 Added ${articles.length} news articles to sitemap`);
  } else {
    console.log("⚠️ No news articles found in DB, adding fallback");
    smStream.write({
      url: "/news",
      changefreq: "daily",
      priority: 0.5,
    });
  }

  const sitemapPromise = streamToPromise(smStream);
  smStream.end();

  await sitemapPromise;
  console.log("✅ Sitemap generated at /public/sitemap.xml");
}


module.exports = generateSitemap;
