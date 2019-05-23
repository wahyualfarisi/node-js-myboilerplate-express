const express = require("express");
const Route = express.Router();
const path = require("path");

Route.get("/", (req, res) => {
  if (req.session.loggedin) {
    return res.render("main"); // included header sidbar , on loaded content with hashchange
  }
  res.render("pages/auth", {
    title: "Login page"
  });
});

Route.get("/dashboard", (req, res) => {
  res.render("pages/home");
});

Route.get("/activity", (req, res) => {
  res.render("pages/activity");
});

module.exports = Route;
