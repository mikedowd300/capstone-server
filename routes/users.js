var express = require('express');
var query = require('../db/queries');
var router = express.Router();
var aws = require('aws-sdk');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
