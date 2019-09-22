const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary.js');


router.post('/:enterpriseID', (req, res, next) => {
  cloudinary.v2.uploader.upload(req.body.blob,{
      resource_type: "video" ,
    },
    function (error, result) {
      if(error) console.error(error);
      else{
        console.log(result);
      }
    });
});

module.exports = router;