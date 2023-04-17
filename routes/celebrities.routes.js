const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/create", (req, res) => {
           res.render("celebrities/new-celebrity.hbs");
});

router.post("/create", async (req, res) => {
   
   try {
        const newCelebrity = await Celebrity.create(req.body);
        console.log("Celebrity created:", newCelebrity);
        res.redirect("/celebrities");
      }
      catch (err) {
        console.log("Celebrity couldn't be added:", err);
        res.redirect("/celebrities/create");
  }
});


router.get("/", async (req, res) => {
    try {
        const celebrity = await Celebrity.find();
    res.render("celebrities/celebrities.hbs", { celebrity} );
} catch (error) {
    res.send(error);
}
}); 

module.exports = router;