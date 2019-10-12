const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');
const Requests   = require('../models/Requests');
const bcrypt     = require("bcryptjs");
const passport   = require("passport");


router.get('/signup', (req,res,next) => {
  res.render("user-views/signup")
})

router.post('/signup', (req,res,next) => {
  let name = req.body.name
  let username = req.body.username
  let password = req.body.password
  let email = req.body.email
  let qualification = req.body.qualification

  const saltRounds = 10;


  const salt  = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  User.create({
    name: name,
    username: username,
    password: hash,
    email: email,
    qualifications: qualification
  }).then(data => {
    res.redirect("/user/login")

  }).catch(err => next(err))
})

router.get('/login', (req,res,next) => {
  res.render('user-views/login')
})

router.post('/login', passport.authenticate("local", {
  successRedirect: "/user/dashboard",
  failureRedirect: "/user/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.use((req,res,next) => {
  if (!req.user) {
    res.redirect("/user/login");
  }
  next();
})

router.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/')
});

router.get('/dashboard', (req, res, next) => {
  Requests.find({}).populate("enterpriseUser")
    .then(requestsFromDB =>{
      // console.log(requestsFromDB)
      // console.log(requestsFromDB.qualifications)
      // let requests = requestsFromDB.filter((request) =>{
      //   let i = 0;
      //   while(i < request.qualifications.length){
      //     if(req.user.qualifications.includes(requestsFromDB.qualifications[i])) 
      //       return true;

      //     i++;
      //   }
      //   return false;
      // })
      res.render('user-views/dashboard', {requests:requestsFromDB})
    })
    .catch(err => console.error(err))
})

router.get('/update', (req,res,next) => {
  res.render('user-views/profile')
})

router.post("/delete", (req,res,next) => {
  User.findByIdAndRemove(req.user.id).then(data => {
    req.logout();
    res.redirect("/")
  }).catch(err => next(err))
})


module.exports = router;