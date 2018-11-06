const router = require('express').Router();

const CachePolicy = require('../policies/cachePolicy');

const {
    GetAllCommentsPolicy,
    PostCommentPolicy,
    IfExistsPolicy
} = require('../policies/commentPolicy');

const {
    GetAllController,
    GetOneController,
    PostController,
    PutController,
    DeleteController
} = require('../controllers/commentControllers');

router.route('/')
    .all(CachePolicy)
    .get(
        GetAllCommentsPolicy,
        GetAllController
    )
    .post(
        PostCommentPolicy,
        PostController
    );

router.route('/:_id')
    .all(CachePolicy)
    .get(GetOneController)
    .put(
        IfExistsPolicy,
        PutController
    )
    .delete(
        IfExistsPolicy,
        DeleteController
    )

module.exports = router;
