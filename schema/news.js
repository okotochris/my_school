const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {type: String, unique:true},
    url: { type: String, unique: true }, // ensures no duplicates
    pubDate: String,
    description: String,
    body: String, // original article content
    aiSummary: String, // new field for AI-generated summary
    aiAnalysis: String, // new field for AI-generated analysis
    image: String,
    author: String,
    category: String,
    fetchedAt: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
