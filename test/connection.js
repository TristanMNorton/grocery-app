/**
 * Connection Helper - Testing Hooks
 * Author: Tristan Norton 2019
 */

const mongoose = require('mongoose');
const Ingredient = require('../models/ingredient/ingredient');

// Setup connection before tests
before(function(done) {
    mongoose.connect('mongodb://localhost/grocery-app', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose.connection.once('open', function(){
        done();
    });
});

// Empty collections when done testing a particular unit
beforeEach(function(done) {
    mongoose.connection.collections.ingredients.drop(done);
});