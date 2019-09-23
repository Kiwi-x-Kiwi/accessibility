const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary.js');
const Requests = require('../models/Requests')


router.post('/', (req, res, next) => {
  cloudinary.v2.uploader.upload(req.body.blob,{
      resource_type: "video" ,
      publicID : req.body.requestID
    })
    // function (error, result) {
    //   if(error) console.error(error);
    //   else{
    //     Request.updateOne({ _id: req.body.requestID }, { $set: { user: req.body.userID } 
    //     }).then( console.log("Success")
    //     ).catch(err => next(err))
    //   }
    // });
})

module.exports = router;