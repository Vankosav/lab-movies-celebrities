const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/create", (req, res) => {
    res.render("movies/new-movie.hbs");
});

router.post("/create", async (req, res) => {
   
    try {
         const newMovie = await Movie.create(req.body);
         console.log("Movie created:", newMovie);
         res.redirect("/movies");
       }
       catch (err) {
         console.log("Movie couldn't be created:", err);
         res.send("Error");
   }
 });

router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find();
    res.render("movies/movies.hbs", { movies } );
} catch (error) {
    res.send(error);
}
}); 

module.exports = router;