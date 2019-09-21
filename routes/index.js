const express = require('express');
const router  = express.Router();
const uploadCloud = require('../config/cloudinary.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/')
});

module.exports = router;
