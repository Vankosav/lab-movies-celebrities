const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here


router.get("/create", (req, res) => {
    Celebrity.find()
    .then((celebs) => {
    res.render("movies/new-movie.hbs", { celebs });
})
.catch((err) => console.log(err));

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

router.get("/:id", (req, res) => {
    Movie.findById(req.params.id).populate("cast")
    .then((movie) => {
        res.render("movies/movie-details.hbs", { movie });
      })
       .catch ((err) => {
        console.log(err);
      })
    });
  
router.post("/:id/delete", (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
      .then(() => {
        res.render("action-completed");
      })
      .catch((err) => console.log(err));
  });

router.get("/:id/edit", (req, res) => {
    Movie.findById(req.params.id)
    .then(movie => res.render("movies/edit-movie", {movie}))
    .catch((error) => console.log(error))
});
  

module.exports = router;