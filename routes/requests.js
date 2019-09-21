const express = require('express');
const router = express.Router();
const Enterprise = require('../models/Enterprise')
const User = require('../models/User')
const Requests = require('../models/Requests')

router.use((req,res,next) => {
  if (!req.user) {
    res.redirect("/");
  }
  next();
})

//create



//current requests of enterprise

//previous requeusts of enterprise

//current request has button to delete











//current requests of matching user

//jobs accepted but not completed by user


//current request has button to delete










module.exports = router;