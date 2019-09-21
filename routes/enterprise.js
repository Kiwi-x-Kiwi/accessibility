// const express = require('express');
// const router  = express.Router();

// const Enterprise = require('../models/Enterprise');
// const bcrypt     = require("bcryptjs");
// const passport = require("passport");


// router.get('/signup', (req,res,next) => {
//   res.render("enterprise-views/signup")
// })


// router.post('/signup', (req,res,next) => {
//   let name = req.body.name
//   let username = req.body.username
//   let password = req.body.password
//   let email = req.body.email
//   let company = req.body.company

//   const saltRounds = 10;


//   const salt  = bcrypt.genSaltSync(saltRounds);
//   const hash = bcrypt.hashSync(password, salt);

//   Enterprise.create({
//     name: name,
//     username: username,
//     password: hash,
//     email: email,
//     company: company
//   }).then(data => {
//     res.redirect("/enterprise/login")

//   }).catch(err => next(err))
// })




// router.get('/login', (req,res,next) => {
//   res.render('enterprise-views/login')
// })


// module.exports = router;