var express = require('express');
var query = require('../db/queries');
var router = express.Router();
var aws = require('aws-sdk');

const S3_BUCKET = process.env.S3_BUCKET;

// router.get('/', function(req, res, next) {
//   query.getUsers()
//       .then((data) => {
//           res.json(data);
//       });
// });

// router.get('/sounds', function(req, res, next) {
//   query.getSounds()
//     .then(function(data) {
//         res.json(data);
//     });
// });

// router.get('/sounds/featured', function(req, res, next) {
//   query.getFeaturedSounds()
//     .then((data) => {
//         res.json(data);
//     });
// });

// router.get('/sites/featured', function(req, res, next) {
//   query.getFeaturedSites()
//     .then((data) => {
//         res.json(data);
//     });
// });

router.get('/sign-s3', function (req, res, next) {
  console.log('line 39');
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
    console.log('line 48');

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

/* POST users listing. */
// router.post('/', function(req, res, next) {
//     console.log('you posting fool');
//     // myRay.push(req.body);
//     res.send(myRay);
// })

module.exports = router;
