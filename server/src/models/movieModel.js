const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    Title: String,
    Year: Number,
    Rated: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Writer: String,
    Actors: String,
    Plot: String,
    Language: String,
    Country: String,
    Awards: String,
    Poster: String,
    Ratings: [{
        Source: String,
        Value: String
    }],
    Metascore: String,
    imdbRating: Number,
    imdbVotes: String,
    imdbID: String,
    Type: String,
    DVD: String,
    BoxOffice: String,
    Production: String,
    Website: String
});


module.exports = movieSchema;
