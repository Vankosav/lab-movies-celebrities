const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/create", (req, res) => {
           res.render("/celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
    const newCelebrity = req.body;
   
    Celebrity.create(newCelebrity)
      .then(() => {
        res.redirect("/celebrities");
      })
      .catch((err) => {
        res.render("/celebrities/new-celebrity", { err });
  })
});

module.exports = router;