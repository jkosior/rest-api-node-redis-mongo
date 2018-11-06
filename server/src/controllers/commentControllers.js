const commentLogger = require('../loggers/commentLoggers');
const { Comment } = require('../models');

module.exports = {

    GetAllController: async (req, res) => {
        let { from, limit, sort_method } = req.query;
        from = Number(from) || 0;
        limit = Number(limit) || 0;
        sort_method = Number(sort_method) || 1;

        let comments;

        try {
            comments = await Comment.find()
                .skip(from)
                .limit(limit)
                .sort({ lastModified: sort_method });

        } catch(e) {
            commentLogger.emit('error', e);
            return res.status(500)
                .json({ message: "An error occured while processing your request" });
        }

        return res.status(200).json(comments)
    },

    GetOneController: async (req, res) => {
        const { _id } = req.params;

        let comment;

        try {
            comment = await Comment.findById(_id);

            if(!comment) {
                return res.status(404)
                    .json({ message: 'Comment not found' });
            }
        } catch (e) {
            commentLogger.emit('error', e);
            return res.status(500)
                .json({ message: "An error occured while processing your request" });
        }

        return res.status(200)
            .json(comment);
    },

    PostController: async (req, res) => {
        const { text } = req.body;
        let comment;

        const data = {
            text,
            lastModified: new Date()
        }

        try {
            comment = await Comment.create(data);
            commentLogger.emit('post', comment);
        } catch (e) {
            commentLogger.emit('error', e);
            return res.status(500)
                .json({ message: "An error occured while processing your request" });
        }

        return res.status(201)
            .send(comment)
    },

    PutController: async (req, res) => {
        const { text } = req.body;
        const { _id } = req.params
        let comment;

        try {
            comment = await Comment.findOneAndUpdate({ _id }, { text });
            commentLogger.emit('update', comment);
        } catch (e) {
            commentLogger.emit('error', e);
            return res.status(500)
                .json({ message: "An error occured while processing your request" });
        }
         return res.status(200)
                .json(comment);
    },

    DeleteController: async (req, res) => {
        const { _id } = req.params;

        let comment;

        try {
            comment = await Comment.findOneAndRemove({ _id });
            commentLogger.emit('delete', comment);
        } catch (e) {
            commentLogger.emit('error', e);
            return res.status(500)
                .json({ message: "An error occured while processing your request" });
        }

        return res.status(200)
            .json(comment)
    }

}
