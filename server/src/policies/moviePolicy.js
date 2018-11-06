const movieLogger = require('../loggers/movieLoggers');
const possibleQueries = [
    'from',
    'limit',
    'sort_by',
    'sort_method',
    'apikey'
];

module.exports = {
    GetAllMoviesPolicy: async (req, res, next) => {
        const keys = Object.keys(req.query);

        const impossibleQueries = keys.some(
            key => !possibleQueries.includes(key)
        );

        if (impossibleQueries) {
            return res.status(400)
                .json({ message: 'Unknown query key' });
        }

        next();
    },

    PostMoviePolicy: async (req, res, next) => {
        const { id, title } = req.body;
        if ( typeof id === 'undefined' && typeof title === 'undefined' ) {
            return res.status(404)
                .json({ message: 'You must provide movie id or title' });
        }

        if ( typeof id !== 'undefined' && typeof title !== 'undefined' ){
            return res.status(406)
                .json({ message: 'You should pass either id or title, not both.' });
        }

        next();
    }

}
