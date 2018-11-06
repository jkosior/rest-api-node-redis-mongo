const express = require('express');
const morgan = require('morgan');
const sinon = require('sinon');

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { PORT } = require('./src/config');

const app = express();

/**
 * link middleware
 */

app.use(
    express.json()
);


if (process.env.NODE_ENV !== 'test') {
    app.use(
        morgan('combined', {
            skip: (req, res) => res.statusCode < 400
        })
    );
}

app.use('/swagger',
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument)
);

/**
 * import routes
 */

const root = require('./src/routes/root');
const movies = require('./src/routes/movie');
const comments = require('./src/routes/comment');
const apikey = require('./src/routes/apiKey');

/**
 * link routes
 */

app.use('/', root);
app.use('/movies', movies);
app.use('/comments', comments);
app.use('/apikey', apikey);


/**
 * start server
 */

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

module.exports = app;
