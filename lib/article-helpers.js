const dbconfig = require("../knexfile.js")[process.env.DB_ENV];
const knex = require("knex")(dbconfig);
const uuid = require("uuid/v1");

module.exports = {
  getAllArticles: (res) => {
    knex("articles").then(articles => {
      res.render("index", { articles });
    });
  },
  getOneAricle: (id, res, mode) => {
    knex("articles")
      .where({ id: id })
      .first()
      .then(article => {
        switch (mode) {
          case 'show':
            res.render("show", { article });
            break;
          case 'edit':
            res.render("edit", { article });
            break;
          default:
            // TODO: throw error
            console.log('Error: Invalid mode.');
            res.redirect("/");
        }
      });
  },
  postArticle: (article, res) => {
    knex("articles")
      .insert({
        id: uuid(),
        title: article.title,
        text: article.text,
        created_at: new Date(),
        components: JSON.stringify(article.component),
        headers: JSON.stringify(article.header),
        paragraphs: JSON.stringify(article.paragraph),
        images: JSON.stringify(article.image)
      })
      .then(() => res.redirect("/"));
  },
  editArticle: (id, article, res) => {
    knex("articles")
      .where({ id: id })
      .first()
      .update({
        title: article.title,
        text: article.text,
        updated_at: new Date()
      })
      .then(article => {
        res.redirect(`/articles/${id}`);
      });
  },
  deleteArticle: (id, res) => {
    knex("articles")
      .where({ id: id })
      .first()
      .del()
      .then(() => {
        res.redirect("/");
      });
  }
}