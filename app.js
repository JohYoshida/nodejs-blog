// Server requirements
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const uuid = require("uuid/v1");

// App setup
const app = express();
const PORT = process.env.PORT || 3000;

// Database setup
const dbconfig = require("./knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);

// Scripts
// import {getAllArticles} from "lib/knex-queries";
const getAllArticles = require("./lib/get-all-articles");
const getOneAricle = require("./lib/get-one-article");
const postArticle = require("./lib/post-article");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  getAllArticles(res);
});
app.post("/", (req, res) => {
  postArticle(req.body, res);
});
app.get("/new", (req, res) => res.render("new"));
app.get("/articles/:id", (req, res) => {
  const mode = "show";
  getOneAricle(req.params.id, res, "show");
});
app.get("/articles/:id/edit", (req, res) => {
  getOneAricle(req.params.id, res, "edit");
})
// Start server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
