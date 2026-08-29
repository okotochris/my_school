const express = require('express');
const router = express.Router();
const isAuthenticated = require("../utility/authenticated.js");




// API FOR SCHOOL MANAGEMENT SYSTEM
router.get("/myschool", isAuthenticated, (req, res) => {
  res.render("myschool");
});
router.get("/school", (req, res) => {
  res.render("school");
});
router.get("/admin_form", (req, res) => {
  res.render("admin_form");
});

module.exports = router;