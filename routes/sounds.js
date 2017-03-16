var express = require('express');
var query = require('../db/queries');
var router = express.Router();
var aws = require('aws-sdk');
const PASSWORD = process.env.ADMIN_PASSWORD;

router.get('/featured', function(req, res, next) {
  query.getFeaturedSounds()
  .then(function(data) {
    res.json(data);
  });
});

router.post('/datausage', function(req, res, next){
  if(req.body.password === PASSWORD){
    query.getAllData()
    .then(function(data) {
      let totalMem = 0;
      data.forEach(function(mem) {
        totalMem += mem.mem_size;
      });
      res.json(totalMem);
    })
  } else {
    res.json('PASSWORD FAILURE');
  }
});

router.get('/:term', function(req, res, next) {
  console.log('getsounds');
  query.getSounds(req.params.term)
  .then(function(data) {
    console.log(data);
    res.json(data);
  });
});

router.post('/', function(req, res, next){
  query.postSound(req.body)
  .then(function(data) {
    res.json(data);
  });
});

router.put('/', function(req, res, next){
  console.log(req.body);
  if(req.body.password === PASSWORD) {
    query.patchIsFeaturedSound(req.body)
    .then(function() {
      res.json(req.body);
    });
  } else {
    res.json("PASSWORD FAILURE!");
  }
})


module.exports = router;
