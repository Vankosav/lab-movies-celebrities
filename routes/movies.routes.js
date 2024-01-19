const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const hbs = require('hbs');

hbs.registerHelper('isSelected', function (currentValue, options) {
    return currentValue.includes(this._id) ? options.fn(this) : options.inverse(this);
});





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

/*router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find();
        console.log(movies);
    res.render("movies/movies.hbs", { movies } );
} catch (error) {
    res.send(error);
}
}); */

router.get("/", (req, res) => {
    Movie.find()
      .then((movie) => {

        res.render("movies/movies.hbs", { movies: movie });
      })
      .catch((err) => console.log(err));
  });

  router.get("/:id", (req, res) => {
    Movie.findById(req.params.id)
      .populate('cast') 
      .then((movie) => {
        res.render("movies/movie-details.hbs", { movie }); 
      })
      .catch((err) => console.log(err));
});

  
router.post("/:id/delete", (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
      .then(() => {
        res.redirect("/movies");
      })
      .catch((err) => console.log(err));
  });

  router.get("/:id/edit", (req, res) => {
    Movie.findById(req.params.id)
        .then((movie) => {
            Celebrity.find()
                .then((celebs) => {
                    // Provide a default value for movie.cast if it's undefined
                    movie.cast = movie.cast || [];
                    
                    res.render("movies/edit-movie.hbs", { movie, celebs });
                    console.log(celebs);
                })
                .catch((err) => console.log(err));
        })
        .catch((error) => console.log(error));
});


  

router.post('/:id/edit', (req, res)=>{
    const { id } = req.params
    const { title, genre, plot, cast } = req.body;
    Movie
    .findByIdAndUpdate(id, { title, genre, plot, cast })
    .then((data)=>{
        res.redirect(`/movies/${data._id}`)
    })
    .catch(err =>{
        console.error(err)
    })
})


module.exports = router;