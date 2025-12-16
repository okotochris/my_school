const express = require("express");
const News = require("../schema/news");
require("dotenv").config();
const Newsupdate = require("../schema/updatedSchema");

const router = express.Router()

router.get("/news", async (req, res) => {
  try {
    const limit = 9;
    const allArticles = await News.find({}).sort({ fetchedAt: -1 });
    const total = allArticles.length;

    let featuredArticle = null;
    let articles = [];

    if (total > 0) {
      const randomIndex = Math.floor(Math.random() * allArticles.length);
      featuredArticle = allArticles[randomIndex];

      // Grid articles: remove featured, take first 9
      articles = [...allArticles];
      articles.splice(randomIndex, 1);
      articles = articles.slice(0, limit);
    }

    res.render("news", {
      featuredArticle,
      articles,
      allArticlesForJS: allArticles, // flat array for JS infinite scroll
      total,
      currentPage: 1,
    });
  } catch (err) {
    console.error("Error rendering news page:", err);
    res.render("news", {
      featuredArticle: null,
      articles: [],
      allArticlesForJS: [],
      total: 0,
      currentPage: 1,
    });
  }
});

router.get("/news_details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //const index = parseInt(id);

    // if (isNaN(index) || index < 0) {
    //   return res.status(400).json({ error: "Invalid article ID" });
    // }

    // Fetch all news articles, newest first
    const allArticles = await News.findOne({_id:id}).sort({ fetchedAt: -1 });

    // if (!Array.isArray(allArticles) || allArticles.length === 0) {
    //   return res.status(404).json({ error: "No news available" });
    // }

    const article = allArticles
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    // Display AI summary if available, else use snippet from body
    const displayContent = article.aiSummary
      ? article.aiSummary
      : article.body?.slice(0, 500) || "";

    // Fetch related articles (exclude current article)
    const relatedArticles = await getRelatedArticles(
      article.category,
      6,
      article.title
    );

    // Render page with article and related articles
    res.render("news_details", {
      article: { ...article.toObject(), displayContent },
      relatedArticles,
    });
  } catch (err) {
    console.error("News details error:", err);
    res.status(500).json({ error: "Server error" });
  }
});



router.get("/api/news/scrolling", async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
  const skip = (page - 1) * limit;

  const total = await News.countDocuments({});
  const articles = await News.find({})
    .sort({ fetchedAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    articles,       // <-- this array is what the front-end appends
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    total,
  });
});
router.get("/api/news", async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1); // >=1
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50); // 1-50
    const skip = (page - 1) * limit;

    if (page > 1000) return res.status(400).json({ error: "Page too large" });

    // Keywords to search in the title
    const keywords = ["waec", "jamb", "university", "school", "neco", "nabteb", "post utme", "education"];

    // Build query: title matches any keyword (case-insensitive)
    const query = {
      $or: keywords.map((k) => ({ title: { $regex: k, $options: "i" } })),
    };

    const total = await News.countDocuments(query);

    const articles = await News.find(query)
      .sort({ fetchedAt: -1 }) // newest first
      .skip(skip)
      .limit(limit);

    res.json({
      articles,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    console.error("❌ Error fetching paginated news:", error.message);
    res.status(500).json({ error: "Failed to load news" });
  }
});



router.get("/api/updated/news", async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
    const skip = (page - 1) * limit;

    const total = await Newsupdate.countDocuments();
    const articles = await Newsupdate.find()
      .sort({ dateTime: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      articles,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    console.error("❌ Error fetching paginated news:", error.message);
    res.status(500).json({ error: "Failed to load news" });
  }
});


async function getRelatedArticles(category, limit = 6, currentTitle = null) {
  const allArticles = await News.find({}).sort({ fetchedAt: -1 });
  if (!allArticles) return [];

  return allArticles
    .filter(a => a.category === category && a.title !== currentTitle)
    .slice(0, limit);
}


module.exports = { router };
