var express = require("express");
const jwt = require("jsonwebtoken");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.render("index", {
      title: "Find NGO: Connecting volunteers & NGO",
      auth: "Login",
      auth_url: "/login",
    });
  }

  jwt.verify(token, process.env.USER_TOKEN_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.render("index", { title: "Find NGO: Connecting volunteers & NGO" });
    } else {
      console.log(decoded);
      if (decoded && decoded.name) {
        res.render("index", {
          title: "Find NGO: Connecting volunteers & NGO",
          auth: "Logout",
          auth_url: "/logout",
          user: decoded,
        });
      } else {
        res.render("index", {
          title: "Find NGO: Connecting volunteers & NGO",
          auth: "Logout",
          auth_url: "/logout",
        });
      }
    }
  });
});

router.get("/login", function (req, res) {
  res.render("login", {title: "Login: Find NGO"});
});

router.get("/logout", function (req, res) {
  res.clearCookie("token");
  return res.redirect('/');
  // return res.render("index", {
  //   title: "Find NGO: Connecting volunteers & NGO",
  //   auth: "Login",
  //   auth_url: "/login",
  // });
});

router.get("/course", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.render("login");
  }

  jwt.verify(token, process.env.USER_TOKEN_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.render("index", { title: "Find NGO" });
    } else {
      console.log(decoded);
      if (decoded && decoded.name) {
        res.render("course", {
          title: "Find NGO",
          auth: "Logout",
          auth_url: "/logout",
          user: decoded,
        });
      } else {
        res.render("course", {
          title: "Find NGO",
          auth: "Logout",
          auth_url: "/logout",
        });
      }
    }
  });
});

router.get("/contact", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.render("login");
  }

  jwt.verify(token, process.env.USER_TOKEN_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.render("index", { title: "Find NGO" });
    } else {
      console.log(decoded);
      if (decoded && decoded.name) {
        res.render("contact", {
          title: "Find NGO",
          auth: "Logout",
          auth_url: "/logout",
          user: decoded,
        });
      } else {
        res.render("contact", {
          title: "Find NGO",
          auth: "Logout",
          auth_url: "/logout",
        });
      }
    }
  });
});

router.get("/about", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.render("login");
  }

  jwt.verify(token, process.env.USER_TOKEN_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.render("index", { title: "Find NGO" });
    } else {
      if (decoded && decoded.name) {
        res.render("aboutus", {
          title: "Find NGO",
          auth: "Logout",
          auth_url: "/logout",
          user: decoded,
        });
      } else {
        res.render("aboutus", {
          title: "Find NGO",
          auth: "Logout",
          auth_url: "/logout",
        });
      }
    }
  });
})

module.exports = router;
