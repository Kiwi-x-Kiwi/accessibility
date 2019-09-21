require('dotenv').config();

const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

cloudinary.v2.uploader.upload("dog.webm",
  { resource_type: "video" },
  function (error, result) { console.log(result, error); });
