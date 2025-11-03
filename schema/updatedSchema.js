const mongoose = require('mongoose');

const newsUpdateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true, unique: true }, // ensures each article stays unique
  dateTime: { type: Date, default: Date.now },
  body: { type: String },
  source: { type: String },
  authors: { type: [String], default: [] },
  image: { type: String, default: '/images/placeholder-news.jpg' },
  category: { type: String, default: 'General' },
  fetchedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Newsupdate', newsUpdateSchema);
