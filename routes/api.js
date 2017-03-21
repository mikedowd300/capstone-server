var express = require('express');
var query = require('../db/queries');
var router = express.Router();
var aws = require('aws-sdk');

const S3_BUCKET = process.env.S3_BUCKET;

router.get('/sign-s3', function (req, res, next) {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, function(err, data) {
      if(err){
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
    res.write(JSON.stringify(returnData));
    res.end();
  });

});

router.get('/sounds', function(req, res) {
  if(req.query.name) {
    let name = req.query.name
    Promise.all([query.getSoundsByNameExact(name), query.getSoundsByNameLike(name), query.getSoundsByGenreLike(name)])
    .then(function(data) {
      data = dataConcat(data);
      data = removeDupes(data);
      res.json(data);
    });
  }else if(req.query.genre) {
    let genre = req.query.genre;
    Promise.all([query.getSoundsByGenreExact(genre), query.getSoundsByGenreLike(genre), query.getSoundsByNameLike(genre)])
    .then(function(data) {
      data = dataConcat(data);
      data = removeDupes(data);
      res.json(data);
    });
  }else if(req.query.author) {
    let author = req.query.author;
    Promise.all([query.getSoundsByAuthorExact(author), query.getSoundsByAuthorLike(author)])
    .then(function(data) {
      data = dataConcat(data);
      data = removeDupes(data);
      res.json(data);
    });
  }else {
    query.getAllSounds()
    .then(function(data) {
      res.json(data);
    });
  }
});

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
