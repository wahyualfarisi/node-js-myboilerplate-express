const express = require("express");
const Route = express.Router();
const db = require("./../config/db_config");
const path = require("path");

Route.post("/", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    db.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      (err, results, fields) => {
        if (err) throw err;

        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect("/");
        } else {
          return res.send("Incorrect username and password");
        }
      }
    );
  } else {
    return res.status(400).send("Please enter username and password");
  }
});

Route.get("/logout", (req, res) => {
  if (req.session.loggedin) {
    req.session.destroy(err => {
      res.redirect("/");
    });
  }
});

module.exports = Route;
