var express = require("express");
const jwt = require("jsonwebtoken");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.render("index", {
      title: "Express",
      auth: "Login",
      auth_url: "/login",
    });
  }

  jwt.verify(token, process.env.USER_TOKEN_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.render("index", { title: "Express" });
    } else {
      console.log(decoded);
      if (decoded && decoded.name) {
        res.render("index", {
          title: "Express",
          auth: "Logout",
          auth_url: "/logout",
          user: decoded,
        });
      } else {
        res.render("index", {
          title: "Express",
          auth: "Logout",
          auth_url: "/logout",
        });
      }
    }
  });
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.get("/logout", function (req, res) {
  res.clearCookie("token");
  return res.render("index", {
    title: "Express",
    auth: "Login",
    auth_url: "/login",
  });
});

router.get("/course", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.render("index", {
      title: "Express",
      auth: "Login",
      auth_url: "/login",
    });
  }

  jwt.verify(token, process.env.USER_TOKEN_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.render("index", { title: "Express" });
    } else {
      console.log(decoded);
      if (decoded && decoded.name) {
        res.render("course", {
          title: "Express",
          auth: "Logout",
          auth_url: "/logout",
          user: decoded,
        });
      } else {
        res.render("course", {
          title: "Express",
          auth: "Logout",
          auth_url: "/logout",
        });
      }
    }
  });
});

router.get("/blog", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.render("index", {
      title: "Express",
      auth: "Login",
      auth_url: "/login",
    });
  }

  jwt.verify(token, process.env.USER_TOKEN_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.render("index", { title: "Express" });
    } else {
      console.log(decoded);
      if (decoded && decoded.name) {
        res.render("blog", {
          title: "Express",
          auth: "Logout",
          auth_url: "/logout",
          user: decoded,
        });
      } else {
        res.render("blog", {
          title: "Express",
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
    return res.render("index", {
      title: "Express",
      auth: "Login",
      auth_url: "/login",
    });
  }

  jwt.verify(token, process.env.USER_TOKEN_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.render("index", { title: "Express" });
    } else {
      console.log(decoded);
      if (decoded && decoded.name) {
        res.render("contact", {
          title: "Express",
          auth: "Logout",
          auth_url: "/logout",
          user: decoded,
        });
      } else {
        res.render("contact", {
          title: "Express",
          auth: "Logout",
          auth_url: "/logout",
        });
      }
    }
  });
});

module.exports = router;
