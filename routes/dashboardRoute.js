const express = require('express');
const router = express.Router();
const isAuthenticated = require("../utility/authenticated.js");



//UPDATE SENIIOR RESULT
router.get("/update-ss", isAuthenticated, (req, res) => {
  res.render("update_ss");
});
//UPDATE JUNIOR RESULT
router.get("/update-jss", isAuthenticated, (req, res) => {
  res.render("update_jss");
});
//UPDATE  BASIC RESULT
router.get("/update-basic", isAuthenticated, (req, res) => {
  res.render("update_basic");
});
//UPDATE NURSERY RESULT
router.get("/update-nursery", isAuthenticated, (req, res) => {
  res.render("update_nursery");
});
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