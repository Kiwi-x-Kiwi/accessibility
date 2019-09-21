require('dotenv').config();

const cloudinary = require('cloudinary');
// const cloudinaryStorage = require('multer-storage-cloudinary');
// const multer = require('multer');

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET
// });

cloudinary.config({
  cloud_name: "kiwilin",
  api_key: "161919856325431",
  api_secret: "ewRxn5BMp1dH5wxZw0nO6aiSNRs"
});

cloudinary.v2.uploader.upload("dog.webm",
  { resource_type: "video" },
  function (error, result) { console.log(result, error); });
