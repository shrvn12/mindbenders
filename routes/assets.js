var express = require("express");
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get("/loginBg", function (req, res, next) {
  const imagePath = path.join(__dirname, "../public/images/background.jpg");
  res.sendFile(imagePath);
});

router.get("/location", function(req, res) {
  const imagePath = path.join(__dirname, "../public/images/location.png");
  res.sendFile(imagePath);
})

router.get("/loginScript", function (req, res) {
  const scriptpath = path.join(__dirname, "../views/scripts/login.js");
  res.sendFile(scriptpath);
});

router.get("/login", function (req, res) {
  res.render("login");
});

module.exports = router;
