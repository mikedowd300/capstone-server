var express = require('express');
var query = require('../db/queries');
var router = express.Router();
var aws = require('aws-sdk');

router.get('/featured', function(req, res, next) {
  query.getFeaturedSounds()
  .then(function(data) {
    res.json(data);
  });
});

router.get('/:term', function(req, res, next) {
  query.getSounds(req.params.term)
  .then(function(data) {
    console.log(data);
    res.json(data);
  });
});

router.post('/', function(req, res, next){
  query.postSound(req.body)
  .then(function(data) {
    console.log(data);
    res.json(data);
  });
})


module.exports = router;
