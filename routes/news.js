const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
const News = require('../schema/news');
const { EventRegistry, QueryArticles, QueryItems } = require("eventregistry");
var erBase = require("eventregistry"); 
const er = new EventRegistry({ apiKey: "836ebeeb-6a91-4ec5-b945-dd802b0119b9" });

const router = express.Router();

router.get('/news', async (req, res)=>{
  res.render('news')
})
router.get('/news_details', (req, res)=>{
  res.render('news_details')
})

// ==========================
// CONFIGURATION
// ==========================
const API_BASE = 'https://newsdata.io/api/1/latest';
const REFRESH_INTERVAL = '0 0 * * *'; // every midnight

// ==========================
// FETCH & SAVE FUNCTION
// ==========================
async function fetchAndSaveNews() {
  try {
    if (!process.env.NEWS_DATA_API_KEY) {
      console.error('❌ Missing NEWS_DATA_API_KEY in environment variables.');
      return;
    }

    const params = {
      q: 'schools OR education Nigeria',
      language: 'en',
      country: 'ng',
      apikey: process.env.NEWS_DATA_API_KEY,
    };

    const response = await axios.get(API_BASE, { params });

    if (response.data.status === 'success' && response.data.results?.length > 0) {
      await News.findOneAndUpdate(
        { query: params.q },
        { articles: response.data.results, fetchedAt: new Date() },
        { upsert: true, new: true }
      );

      console.log(`✅ Saved ${response.data.results.length} Nigerian school articles at ${new Date().toISOString()}`);
    } else {
      console.log('⚠️ No articles found or empty response.');
      console.log('🪶 API Response:', response.data);
    }
  } catch (error) {
    console.error('❌ Fetch failed:', error.response?.data || error.message);
  }
}


router.get('/api/news', async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1); // >=1
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50); // 1-50
    const skip = (page - 1) * limit;

    if (page > 1000) return res.status(400).json({ error: 'Page too large' });

    // Find the latest cached news
    let latest = await News.findOne({ query: 'nigeria-school-news' })
      .sort({ fetchedAt: -1 });

    // if (!latest || !latest.articles || latest.articles.length === 0) {
    //   // Non-blocking fallback
    //   fetchNigerianSchoolNews().catch(fetchErr => console.error('Background fetch failed:', fetchErr.message));
    //   return res.json({ articles: [], currentPage: page, totalPages: 0, total: 0 });
    // }

    // Simple slice (no full load issue for small arrays)
    const allArticles = latest.articles; // Already array
    const total = allArticles.length;
    const paginatedArticles = allArticles.slice(skip, skip + limit);

    res.json({
      articles: paginatedArticles,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    console.error('❌ Error fetching paginated news:', error.message);
    res.status(500).json({ error: 'Failed to load news' });
  }
});

// GET /api/news/:id
router.get('/api/news_details', async (req, res) => {
 

  try {
    const id = parseInt(req.query.id); // Ensure it's a number (e.g., '0' -> 0)
    if (isNaN(id) || id < 0) {
      return res.status(400).json({ error: 'Invalid article ID' });
    }

    // Fetch the latest news batch (sorted by recency)
    const latest = await News.findOne({ query: 'nigeria-school-news' }) // Use your QUERY const if shared
      .sort({ fetchedAt: -1 })
      .limit(1);

    if (!latest || !Array.isArray(latest.articles) || latest.articles.length === 0) {
      return res.status(404).json({ error: 'No news available' });
    }

    // Query by index (matches frontend slicing)
    const article = latest.articles[id];
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Optional: Add a timestamp or metadata

    res.json({
      ...article,
      fetchedAt: latest.fetchedAt, // Include batch timestamp for frontend use
      source: 'MySchoolResults' // Custom branding
    });
  } catch (err) {
    console.error('News details error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});




async function fetchNigerianSchoolNews() {
  try {
    // Build a broad query focused on Nigerian education
    const q = new QueryArticles({
      sourceUri: QueryItems.OR([
        "vanguardngr.com",
        "tribuneonlineng.com",
        "legit.ng",
        "thisdaylive.com",
        "punchng.com",
        "sunnewsonline.com",
        "guardian.ng",
        "thenationonlineng.net",
      ]),
      keyword: QueryItems.OR([
        "JAMB",
        "WAEC",
        "NECO",
        "school",
        "education",
        "university",
        "students",
        "teachers",
        "admission",
      ]),
      lang: "eng",
      sortBy: "date",
      maxItems: 20, // Fetch a healthy mix
    });

    // Fetch articles
    const response = await er.execQuery(q);
    const articles = response.articles?.results;

    if (!articles || articles.length === 0) {
      console.log("⚠️ No school-related news found.");
      return;
    }

    // Clean and keep all results (even if not strictly school news)
    const formattedArticles = articles.map((article) => ({
      title: article.title,
      url: article.url,
      dateTime: article.dateTimePub || article.dateTime,
      body: article.body || "No content",
      source: article.source?.title || "Unknown",
      authors: article.authors || [],
      image: article.image || "",
    }));

    // Save to MongoDB using upsert (replace old data)
    await News.updateOne(
      { query: "nigeria-school-news" },
      { $set: { articles: formattedArticles, fetchedAt: new Date() } },
      { upsert: true }
    );

    console.log(`✅ Saved ${formattedArticles.length} school-related articles to MongoDB`);
  } catch (error) {
    console.error("❌ Fetch failed:", error.message);
  }
}


cron.schedule('0 2 */2 * *', async () => {
  console.log('🕑 Running Nigerian school news fetch (every 2 days)...');
  await fetchNigerianSchoolNews();
});


module.exports = { router, fetchNigerianSchoolNews };
