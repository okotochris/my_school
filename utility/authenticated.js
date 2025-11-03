//CHECKING IF USER HAS LOGIN
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.returnTo = req.originalUrl; // Store the original URL
    if (req.originalUrl == "/myschool") {
      res.redirect("school");
    }
    res.redirect("login");
  }
}


module.exports = isAuthenticated;