const redisClient = require('../redis');
const { promisify } = require('util');
const existsAsync = promisify(redisClient.exists).bind(redisClient);

module.exports = async (req, res, next) => {

    const apikey = req.query.apikey || req.body.apikey;

    if (typeof apikey === 'undefined') {
        return res.status(500)
            .json({ message: 'Unknown api key' });
    }

    const keyExists = await existsAsync(apikey);

    if (!keyExists) {
        return res.status(500)
            .json({ message: 'Unknown api key' });
    }

    next();

};
