const { Schema, model } = require('mongoose');
 
const movieSchema = new Schema (
  {
    title: String,
    genre: String,
    plot: String,
    cast: [String]
  },
);

const Movie = model("movies", movieSchema);

module.exports = Movie;
