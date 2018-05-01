var mongoose=require('mongoose');
mongoose.set('debug',true);
mongoose.connect('mongodb://michael:1122wwo@ds259089.mlab.com:59089/heroku_gm8w3d3h');

mongoose.Promise=Promise;

module.exports.User=require('./User');
module.exports.Seafood=require('./Seafood');