var express = require('express');
var query = require('../db/queries');
var router = express.Router();
var aws = require('aws-sdk');

router.get('/:term', function(req, res, next) {
  res.send(req.params);
});

module.exports = router;
