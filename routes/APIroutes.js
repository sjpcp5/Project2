// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our model
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // Get route for returning words based on difficulty
  app.get("/api/words/difficulty/:difficulty", function(req, res) {
    db.Words.findAll({
      where: {
        difficulty: req.params.difficulty
      }
    }).then(function(dbWords) {
      res.json(dbWords);
    });
  });
};
