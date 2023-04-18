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

router.get("/:id", async (req, res) => {
    try {
        const { movieId } = req.params;
        const movie = await Movie.findById(movieId).populate("cast");
        console.log(movie);
        res.render("movies/movie-details.hbs", { movie });
      } catch (err) {
        console.log(err);
      }
    });
  
  router.post("/:id/delete", (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
      .then(() => {
        res.render("action-completed");
      })
      .catch((err) => console.log(err));
  });
  

module.exports = router;