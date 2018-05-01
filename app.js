require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var authRoutes= require('./routes/auth');
var seafoodRoutes=require('./routes/seafood');
var userRoutes=require('./routes/users');
var cors = require('cors')
var app = express();
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/seafood',seafoodRoutes);
app.use("/",userRoutes);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use(function(err, req, res, next) {

  return res.status(err.status || 500).json({
    error: {
      message: err.message || "Oops! Something went wrong."
    }
  });
});

module.exports = app;
