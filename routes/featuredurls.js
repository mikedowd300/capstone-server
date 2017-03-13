var express = require('express');
var query = require('../db/queries');
var router = express.Router();
var aws = require('aws-sdk');

router.get('/', function(req, res, next) {
  query.getFeaturedSites()
  .then(function(data) {
    res.json(data);
  });
});

router.post('/', function(req, res, next){
  req.body.isFeatured = false;
  query.addFeatureableSites(req.body)
  .then(function() {
    res.json('success');
  });
})


module.exports = router;
