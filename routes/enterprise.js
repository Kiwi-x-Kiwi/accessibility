const express = require('express');
const router  = express.Router();

const Enterprise = require('../models/Enterprise');
const bcrypt     = require("bcryptjs");
const passport = require("passport");

router.get('/signup', (req,res,next) => {
  res.render("enterprise-views/signup")
})

router.post('/signup', (req,res,next) => {
  let name = req.body.name
  let username = req.body.username
  let password = req.body.password
  let email = req.body.email
  let company = req.body.company
  const saltRounds = 10;

  const salt  = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  Enterprise.create({
    name: name,
    username: username,
    password: hash,
    email: email,
    company: company,
    isEnterprise: true,
  }).then(data => {
    res.redirect("/enterprise/login")

  }).catch(err => next(err))
})

router.get('/login', (req,res,next) => {
  res.render('enterprise-views/login')
})

router.get('/user-video/:enterprise', (req, res, next) => {
  res.render('enterprise-views/user-video',{enterpriseID: req.params.enterprise})
})

router.post('/login', passport.authenticate("local", {
  successRedirect: "/enterprise/dashboard",
  failureRedirect: "/enterprise/dashboard",
  failureFlash: true,
  passReqToCallback: true,}));

// router.use((req,res,next) => {
//   if (!req.user) {
//     console.log(req.user)
//     res.redirect("/enterprise/dashboard");
//     return;
//   }
//   next();
// })

router.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/')
});


router.get('/dashboard', (req, res, next) => {
  res.render('enterprise-views/dashboard')
})

router.get('/update', (req,res,next) => {
  res.render('enterprise-views/profile')
})

router.post("/delete", (req,res,next) => {
  Enterprise.findByIdAndRemove(req.user.id).then(data => {
    req.logout();
    res.redirect("/")
  }).catch(err => next(err))
})

module.exports = router;