var express = require('express');
var query = require('../db/queries');
var router = express.Router();
var aws = require('aws-sdk');

router.get('/', function(req, res, next) {
  query.getFeaturedSites()
  .then(function(data) {
    console.log('getFeaturedSites');
    res.json(data);
  });
});


module.exports = router;
