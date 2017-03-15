var express = require('express');
var query = require('../db/queries');
var router = express.Router();
var aws = require('aws-sdk');

const S3_BUCKET = process.env.S3_BUCKET;

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

module.exports = router;
