const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    PORT: 3000,
    apiKey: '&apikey=36a703b2',
    httpReqRoot: 'http://www.omdbapi.com/?',
    mongo: {
        username: 'appadmin',
        password: 'vFE7RFQat5tPhdUC',
        connectionString: isProduction
            ? 'mongodb://mongo:27017/app'
            : 'mongodb://127.0.0.1:27017/app'
    }
}
