var express = require('express');
var query = require('../db/queries');
var router = express.Router();
var aws = require('aws-sdk');
const PASSWORD = process.env.ADMIN_PASSWORD;

router.get('/author/:author', function(req, res, next) {
  let author = req.params.author.split(':')[1];
  Promise.all([query.getSoundsByAuthorExact(author), query.getSoundsByAuthorLike(author)])
  .then(function(data) {
    data = dataConcat(data);
    data = removeDupes(data);
    res.json(data);
  });
});

router.get('/genre/:genre', function(req, res, next) {
  let genre = req.params.genre.split(':')[1];
  Promise.all([query.getSoundsByGenreExact(genre), query.getSoundsByGenreLike(genre), query.getSoundsByNameLike(genre)])
  .then(function(data) {
    data = dataConcat(data);
    data = removeDupes(data);
    res.json(data);
  });
});

router.get('/name/:name', function(req, res, next) {
  let name = req.params.name.split(':')[1];
  Promise.all([query.getSoundsByNameExact(name), query.getSoundsByNameLike(name), query.getSoundsByGenreLike(name)])
  .then(function(data) {
    data = dataConcat(data);
    data = removeDupes(data);
    res.json(data);
  });
});

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
  query.getSounds(req.params.term)
  .then(function(data) {
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
  if(req.body.password === PASSWORD) {
    query.patchIsFeaturedSound(req.body)
    .then(function() {
      res.json(req.body);
    });
  } else {
    res.json("PASSWORD FAILURE!");
  }
})

function dataConcat(ray) {
  let newRay = [];
  let len = ray.length;
  for(let i = 0; i < len; i++) {
    newRay = newRay.concat(ray[i]);
  }
  return newRay;
}

function removeDupes(ray) {
  let newRay = [ray[0]];
  let testRay = [ray[0].sound_id];
  for(let i = 1; i < ray.length; i++) {
    if(!testRay.includes(ray[i].sound_id)) {
      newRay.push(ray[i]);
      testRay.push(ray[i].sound_id);
    }
  }
  return newRay;
}

module.exports = router;
