require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const bcrypt       = require('bcryptjs')

const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);

const flash      = require('connect-flash');

const passport   = require('passport')
const LocalStrategy     = require('passport-local').Strategy


const User              = require('./models/User')


mongoose
  .connect(process.env.MONGODB_URI2, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ 
  limit: "50mb",
  extended: false }));
app.use(bodyParser.json({ limit: "50mb" }))
app.use(cookieParser());

// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Access This.';

app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.errorMessage = req.flash('error')
  next();
})



const index = require('./routes/index');
app.use('/', index);


app.use('/enterprise', require('./routes/enterprise'))
app.use('/user', require('./routes/user'))
app.use('/requests', require('./routes/requests'))

const video = require('./routes/video');
app.use('/video', video);

const upload = require('./routes/upload');
app.use('/upload', upload);



module.exports = app;
