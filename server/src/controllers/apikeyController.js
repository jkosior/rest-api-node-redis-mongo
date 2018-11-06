const sha3 = require('crypto-js/sha3')
const redisClient = require('../redis');

module.exports = (req, res) => {
    const randomNum = (Math.random() * 1000)
        .toString();

    const month = 60 * 60 * 24 * 30;

    const key = sha3( `urugten${randomNum}` )
        .toString()
        .slice(0, 20);

    res.status(200)
        .json({ key });

    redisClient.setex(
        key,
        month,
        'exists'
    );
}
