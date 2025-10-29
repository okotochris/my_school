const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  query: { type: String, required: true },
  articles: { type: Array, default: [] },
  fetchedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', newsSchema);
