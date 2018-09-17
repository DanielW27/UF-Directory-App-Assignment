'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config'),
    jsonListings = require('./listings.json');

fs.readFile('listings.json', 'utf8', function(err, data) {
    if(err){
        throw err;
      }
    jsonListings = JSON.parse(data);
})
function hasProp (obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* Connect to your database */
mongoose.connect(config.db.uri, {useNewUrlParser: true});
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () =>{
  for (var ii = 0; ii < jsonListings.entries.length;ii++){
    var newListing = new Listing({
      code: jsonListings.entries[ii].code,
      name: jsonListings.entries[ii].name,
      address: jsonListings.entries[ii].address
    });
    if('coordinates' in jsonListings.entries[ii]){
      newListing.coordinates.latitude = jsonListings.entries[ii].coordinates.latitude;
      newListing.coordinates.longitude = jsonListings.entries[ii].coordinates.longitude;
    }
    newListing.save(function(err){
      if(err) throw err;
    })
  }
  console.log('saved to database');
});
