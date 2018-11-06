const mongoose = require('mongoose');
const isTest = process.env.NODE_ENV === 'test';

/**
 * import models
 */
const commentSchema = require('./commentModel');
const movieSchema = require('./movieModel');

/**
 * Import config
 */
const { mongo: {
    username,
    password,
    connectionString
}} = require('../config');

/**
 * Connect with mongo
 */
mongoose.connect(connectionString, {
    user: username,
    pass: password
})
.then(fulfilled => !isTest ? console.log('Mongo connected') : false)
.catch(err => console.log(err))

const db = mongoose.connection;

/**
 * link models
 */
const Comment = mongoose.model('Comment', commentSchema);
const Movie = mongoose.model('Movie', movieSchema);

module.exports = {
    Comment, Movie, db
}
