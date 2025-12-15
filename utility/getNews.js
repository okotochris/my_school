require("dotenv").config();
const {
  EventRegistry,
  QueryArticles,
  QueryItems,
  RequestArticlesInfo,
  ReturnInfo,
  ArticleInfoFlags,
} = require("eventregistry");
const OpenAI = require("openai");
const News = require("../schema/news");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// AI summary + analysis
async function generateAISummaryAndAnalysis(article, category) {
  if (!article.body || article.body.length < 50) return null;

  const excerpt = article.body.slice(0, 500); // limit input
  const prompt = `
You are an education news editor for Nigerian students.

Title: ${article.title}
Category: ${category}

Text:
${excerpt}

Task:
1. Write an original summary (120–150 words).
2. Write an analysis (120–150 words) explaining why this news matters to Nigerian students.
3. Do NOT rewrite or paraphrase the source article.
4. Use simple language.

Output format:
Summary:
Analysis:
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    const summary = content.match(/Summary:\s*([\s\S]*?)Analysis:/)?.[1]?.trim();
    const analysis = content.match(/Analysis:\s*([\s\S]*)/)?.[1]?.trim();
    if (!summary || !analysis) return null;

    return { summary, analysis };
  } catch (err) {
    console.error("❌ OpenAI error:", err.message);
    return null;
  }
}

// Category detection
function getCategory(article) {
  const text = `${article.title || ""} ${article.body || ""}`.toLowerCase();
  if (text.includes("waec")) return "WAEC";
  if (text.includes("jamb")) return "JAMB";
  if (text.includes("neco")) return "NECO";
  if (text.includes("nabteb")) return "NABTEB";
  if (text.includes("post utme") || text.includes("utme")) return "Post UTME";
  if (
    text.includes("university") ||
    text.includes("polytechnic") ||
    text.includes("college") ||
    text.includes("school") ||
    text.includes("student") ||
    text.includes("teacher") ||
    text.includes("admission") ||
    text.includes("education") ||
    text.includes("asuu")
  )
    return "Education";
  return "General";
}

// Delay helper
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Main fetch function
async function fetchNigerianSchoolNews() {
  try {
    const er = new EventRegistry({ apiKey: process.env.NEWS_DATA_API_KEY });

    const q = new QueryArticles({
      keywords: QueryItems.OR([
        "JAMB",
        "WAEC",
        "NECO",
        "NABTEB",
        "school",
        "education",
        "university",
        "college",
        "polytechnic",
        "student",
        "teacher",
        "admission",
      ]),
      sourceUri: QueryItems.OR([
        "vanguardngr.com",
        "punchng.com",
        "guardian.ng",
        "thisdaylive.com",
        "premiumtimesng.com",
        "dailypost.ng",
      ]),
      lang: "eng",
      isDuplicateFilter: "skipDuplicates",
    });

    q.setRequestedResult(
      new RequestArticlesInfo({
        page: 1,
        count: 100, // fetch up to 100 articles
        sortBy: "date",
        sortByAsc: false,
        returnInfo: new ReturnInfo({
          articleInfo: new ArticleInfoFlags({
            body: true,
            image: true,
            source: true,
          }),
        }),
      })
    );

    const response = await er.execQuery(q);
    const articles = response?.articles?.results || [];
    if (!articles.length) {
      console.log("⚠️ No articles found today.");
      return;
    }

    // Filter only school/education news
    let schoolArticles = articles.filter((a) => getCategory(a) === "Education");

    console.log(`Fetched ${articles.length} articles, ${schoolArticles.length} are school-related.`);

    // Limit AI processing to 30 articles
    const articlesToProcess = schoolArticles.slice(0, 30);

    let savedCount = 0;

    for (const article of articlesToProcess) {
      const aiContent = await generateAISummaryAndAnalysis(article, "Education");

      const formatted = {
        title: article.title,
        url: article.uri,
        pubDate: article.dateTime || article.dateTimePub,
        body: article.body || "", // original article
        aiSummary: aiContent?.summary || null,
        aiAnalysis: aiContent?.analysis || null,
        image: article.image || "https://via.placeholder.com/800x500",
        author: article.source?.title || "Unknown",
        category: "Education",
        fetchedAt: new Date(),
      };

      await News.updateOne({ url: formatted.url }, { $set: formatted }, { upsert: true });
      savedCount++;

      await delay(1000); // avoid OpenAI rate limits
    }

    console.log(`✅ Processed ${savedCount} school articles with AI.`);
  } catch (error) {
    console.error("❌ Fetch failed:", error.message);
  }
}

module.exports =  fetchNigerianSchoolNews
