/* This module is strictly meant for one route. This route
 * is responsible for rendering our angular app home page.
 */
let express = require('express');
let path = require('path');
let router = express.Router();

/**
 * GET /
 * Render out angular app.
 */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/visitors.html'));
});

module.exports = router;