const uuid = require("uuid/v1");

exports.seed = function(knex, Promise) {
  // Delete all existing entries
  return knex("articles")
    .del()
    .then(function() {
      // Insert seed entries
      return knex("articles").insert([
        {
          id: uuid(),
          user_id: "admin",
          title: "A Proper Article",
          is_private: 1,
          created_at: new Date(),
          components: JSON.stringify(["h", "p", "h", "p", "i", "p"]),
          headers: JSON.stringify(["Headers", "Images"]),
          paragraphs: JSON.stringify([
            "A proper article should have a header.",
            "A proper article may have an image.",
            "The image may be surrounded by text."
          ]),
          images: JSON.stringify(["power.jpeg"])
        },
        {
          id: uuid(),
          user_id: "admin",
          title: "Hi Sophie!",
          is_private: 0,
          created_at: new Date(),
          components: JSON.stringify(["h", "p", "i", "p", "h", "p", "p", "p", "p"]),
          headers: JSON.stringify(["A simple blog app", "To Do"]),
          paragraphs: JSON.stringify([
            "It's still pretty barebones, but you can now make articles with headers, paragraphs, and images, in any order or quantity you want. Articles can be marked private, so only you can see them.",
            "Here's a picture of a very fat rat.",
            "Styling! This website still looks pretty lame. If you have any suggestions (or CSS), let me know!",
            "Let me know if there's any other features you want me to add!",
            "Joh"
          ]),
          images: JSON.stringify(["power.jpeg"])
        }
      ]);
    });
};
