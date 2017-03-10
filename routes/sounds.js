var express = require('express');
var query = require('../db/queries');
var router = express.Router();
var aws = require('aws-sdk');

router.get('/:term', function(req, res, next) {
  query.getSounds(req.params.term)
  .then(function(data) {
    res.json(data);
  });
});

module.exports = router;
