var express = require('express');
var query = require('../db/queries');
var router = express.Router();
var aws = require('aws-sdk');

router.get('/', function(req, res, next) {
  res.send('hello');
});

module.exports = router;
