const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary.js');

// router.post('/', uploadCloud.single('video'), (req, res, next) => {
//   // const { title, description } = req.body;
//   const imgPath = req.file.url;
//   const imgName = req.file.originalname;
//   console.log(imgPath)
//   console.log(imgName)
  // const newMovie = new Movie({ title, description, imgPath, imgName })
  // newMovie.save()
  //   .then(movie => {
  //     res.redirect('/');
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
// });


router.post('/', (req, res, next) => {
  console.log(req.body);
  console.log(req.body.name);
  console.log("hi");
   
  cloudinary.v2.uploader.upload(req.body.name,
      { resource_type: "video" },
      function (error, result) { console.log(result, error); });
});

module.exports = router;