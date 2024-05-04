const express = require("express");
const app = express();
const path = require("path");

let port = 3000;

app.listen(port, () => {
  console.log("Bhai Chal Raha hey Server");
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/profile", (req, res) => {
  const { username } = req.params;
  res.render("correctlink", { username: username });
});

app.get("/profile/:username", (req, res) => {
  const { username } = req.params;
  const instadata = require("./data.json");

  let userFound = false;
  instadata.map((item) => {
    if (username === item.user) {
      res.render("profile", { username: username, profileData: item });
      userFound = true;
    }
  });

  if (!userFound) {
    res.render("profileNotFound", { username: username });
  }
});
