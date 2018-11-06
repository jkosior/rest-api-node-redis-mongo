const commentLogger = require('../loggers/commentLoggers');
const { Comment } = require('../models');
const possibleQueries = [
    'apikey',
    'from',
    'limit',
    'sort_method'
];

module.exports = {
    GetAllCommentsPolicy: async (req, res, next) => {
        const keys = Object.keys(req.query);

        const impossibleQueries = keys.some(
            key => !possibleQueries.includes(key)
        );

        if (impossibleQueries) {
            return res.status(400)
                .json({ message: 'Unknown query key' })
        }

        next();
    },

    PostCommentPolicy: async (req, res, next) => {
        const { text } = req.body;

        if (typeof text === "undefined" || text === null) {
            return res.status(400)
                .json({ message: "You should provide text" })
        }

        next();
    },

    IfExistsPolicy: async (req, res, next) => {
        const { _id } = req.params;

        try {
            const comment = Comment.findById(_id);
            if(!comment) {
                return res.status(404)
                    .json({ message: 'Comment not found' });
            }
        } catch (e) {
            commentLogger.emit('error', e);
            return res.status(500)
                .json({ message: 'An error occured while processing your request' });
        }

        next();
    }

}
