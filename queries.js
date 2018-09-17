/* Fill out these functions using Mongoose queries*/
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config'),
    jsonListings = require('./listings.json');


var findLibraryWest = function() {
       Listing.find({name: 'Library West'}, function(err, listing){
         if(err) throw err;
         console.log(listing);
       });
    };

var removeCable = function() {
      Listing.find({code: 'CABL'}, function(err,listing){
        if(err) throw err;
        console.log(listing);
      });
      Listing.findOneAndRemove({code: 'CABL'}, function(err){
        if (err) throw err;
      });
    };

var updatePhelpsLab = function() {
    Listing.findOneAndUpdate({ code: 'PHL' }, { address: '1953 Museum Rd, Gainesville, FL 32603' }, function(err, user) {
     if (err) throw err;
     console.log(user);
    });
};

var retrieveAllListings = function() {
       Listing.find({}, function(err,listings){
         if (err) throw err;
         console.log(listings);
       });
    };
mongoose.connect(config.db.uri, {useNewUrlParser: true});
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
console.log("hello");
conn.once('open', () =>{
  console.log("we're on");
  findLibraryWest();
  removeCable();
  updatePhelpsLab();
  retrieveAllListings();
});
