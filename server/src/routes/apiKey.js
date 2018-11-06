const router = require('express').Router();
const ApiKeyController = require('../controllers/apikeyController');

router.get('/', ApiKeyController);

module.exports = router;
