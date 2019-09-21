// const cloudinary = require('cloudinary');
// const cloudinaryStorage = require('multer-storage-cloudinary');
// const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

document.getElementById("upload").onclick = cloudinary.v2.uploader.upload("../dog.mp4",
  { resource_type: "video" },
  function (error, result) { console.log(result, error); });
