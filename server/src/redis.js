const redis = require('redis');
const isProduction = process.env.NODE_ENV === 'production';
const client = isProduction
    ? redis.createClient('redis://redis')
    : redis.createClient();

client.on('connect',
    () => console.log('Redis client connected')
);

client.on('error',
    (err) => console.log(`An error occured: ${err}`)
);

module.exports = client;
