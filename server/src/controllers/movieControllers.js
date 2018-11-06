const axios = require('axios');
const _ = require('lodash');

const { Movie } = require('../models');
const { httpReqRoot, apiKey } = require('../config');
const movieLogger = require('../loggers/movieLoggers');

module.exports = {

    GetAllController: async (req, res) => {
        let { from, limit, sort_by, sort_method } = req.query;

        from = Number(from) || 0;
        limit = Number(limit) || 0;
        sort_method = Number(sort_method) || 1

        if (typeof sort_by === 'undefined' && sort_method !== 1 ) {
            return res.status(400)
                .json({ message: 'You should provide sort_by query key' })
        }

        let movies;
        try {
            movies = await Movie.find()
                .skip(from)
                .limit(limit)
                .sort({ [sort_by]: sort_method })
        } catch (e) {
            movieLogger.emit('error', e);
            return res.status(500)
                .json({ message: 'An error occured while processing your request' });
        }

        return res.status(200)
            .json(movies)
    },

    GetOneController: async (req, res) => {
        const { _id } = req.params;

        let movie;
        try {
            movie = await Movie.findById(_id);
            if (!movie) {
                movieLogger.emit('error', e);
                return res.status(404)
                    .json({ message: 'Movie not found' });
            }

        } catch (e) {
            movieLogger.emit('error', e);
            return res.status(500)
                .json({ message: 'An error occured while processing your request' });
        }

        return res.status(200)
            .json(movie)
    },

    PostController: async (req, res) => {

        const { title, id } = req.body;

        let getDataString;
        let movie;

        if (typeof id !== 'undefined') {
            getDataString = `${httpReqRoot}i=${id}${apiKey}`;
        }

        if (typeof title !== 'undefined') {
            getDataString = `${httpReqRoot}t=${id}${apiKey}`;
        }

        try {
            const { data } = await axios.get(getDataString);

            if (_.isArray(data)) {
                return res.status(406)
                .json({
                    message: 'Please pick one of the movies and add them by id',
                    data
                });
            }

            const { Title, Year } = data;
            const checker = await Movie.findOne({ Title, Year });

            if (checker) {
                return res.status(400)
                    .json({ message: 'Such record already exists in database' });
            }

            movie = await Movie.create(data);
            movieLogger.emit('post', movie);
        } catch (e) {
            movieLogger.emit('error', e);
            return res.status(500)
                .json({ message: 'An error occured while processing your request' })
        }

        return res.status(201)
            .json(movie)
    }

};
