const router = require('express').Router();

const CachePolicy = require('../policies/cachePolicy');

const {
    GetAllMoviesPolicy,
    PostMoviePolicy,
} = require('../policies/moviePolicy');

const {
    GetAllController,
    GetOneController,
    PostController
} = require('../controllers/movieControllers');

router.route('/')
    .all(CachePolicy)
    .get(
        GetAllMoviesPolicy,
        GetAllController
    )
    .post(
        PostMoviePolicy,
        PostController
    );

router.route('/:_id')
    .get(
        CachePolicy,
        GetOneController
    );

module.exports = router;
