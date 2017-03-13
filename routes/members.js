var express = require('express');
var query = require('../db/queries');
var router = express.Router();
var aws = require('aws-sdk');
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  query.getLoginInfo(req.body.email)
  .then(function(data) {
    if(!data){
      res.json("Invalid email!");
    } else if(bcrypt.compareSync(req.body.password, data.password)){
      query.getUserInfo(data.id)
      .then(function(datb) {
        let datc = {
          id: data.id,
          type: data.type,
          sounds: datb
        }
        res.json(datc);
      });
    } else {
      res.json("Email and password do not match!");
    }
  });
});

module.exports = router;
