// const express = require('express');
// const router  = express.Router();

// const User        = require('../models/User');
// const bcrypt     = require("bcryptjs");
// const passport = require("passport");


// router.get('/signup', (req,res,next) => {
//   res.render("user-views/signup")
// })


// router.post('/signup', (req,res,next) => {
//   let name = req.body.name
//   let username = req.body.username
//   let password = req.body.password
//   let email = req.body.email
//   let qualification = req.body.qualification

//   const saltRounds = 10;


//   const salt  = bcrypt.genSaltSync(saltRounds);
//   const hash = bcrypt.hashSync(password, salt);

//   User.create({
//     name: name,
//     username: username,
//     password: hash,
//     email: email,
//     qualifications: qualification
//   }).then(data => {
//     res.redirect("/user/login")

//   }).catch(err => next(err))
// })


// router.get('/login', (req,res,next) => {
//   res.render('user-views/login')
// })






// module.exports = router;