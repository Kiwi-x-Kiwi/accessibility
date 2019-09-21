const express = require('express');
const router  = express.Router();


router.get('/signup', (req,res,next) => {

  res.render("enterprise-views/signup")
})


router.get('/login', (req,res,next) => {
  res.render('enterprise-views/login')
})


module.exports = router;