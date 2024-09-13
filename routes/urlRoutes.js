const express = require('express');
const route = express.Router();

const { HandelCreatUrl, HandelUrlRedirect, HandelShowAllUrl } = require('../controllers/urlController');
const { checkAuth } = require('../middleware/authMiddleware');

route.post('/', HandelCreatUrl);
// route.get('/show', checkAuth, HandelShowAllUrl);
route.get('/:shortID', HandelUrlRedirect);

module.exports = route;