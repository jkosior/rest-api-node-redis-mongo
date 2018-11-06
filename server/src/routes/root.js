const router = require('express').Router();
const RootController = require('../controllers/rootController');

router.get('/', RootController);

module.exports = router;
