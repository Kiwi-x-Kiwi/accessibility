const express = require('express');
const router = express.Router();
const Enterprise = require('../models/Enterprise')
const User = require('../models/User')
const Requests = require('../models/Requests')

// router.use((req,res,next) => {
//   if (!req.user) {
//     res.redirect("/");
//   }
//   next();
// })

//create
// router.get('/create', (req,res,next) => {
//   res.render("request-views/new")
// })

router.get('/create', (req,res,next) => {
  res.render("request-views/new")
})
router.get('/:id/view', (req,res,next) => {
  res.render("request-views/video", {requestID: req.params.id})
})
router.get('/:id', (req,res,next) => {
  res.render("request-views/record")
})


router.post('/create', (req,res,next) => {
  Requests.create({
    enterpriseUser: req.user.id,
    qualifications: req.body.qualification,
    webURL: req.body.webURL,
    isClosed: false,
  }).then(
    res.redirect('/enterprise/dashboard')
  ).catch(err => next(err))
})


//current requests of enterprise

//previous requeusts of enterprise

//current request has button to delete











//current requests of matching user

//jobs accepted but not completed by user


//current request has button to delete










module.exports = router;