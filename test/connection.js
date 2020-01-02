/**
 * Connection Helper - Testing Hooks
 * Author: Tristan Norton 2019
 */

const mongoose = require('mongoose')

// Setup connection before tests
before(function(done) {
    mongoose.connect('mongodb://localhost/grocery-app', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongoose.connection.once('open', function(){
        done()
    })
})

// Empty collections before each test
after(async function() {
    await mongoose.connection.collections.ingredients.drop()
    await mongoose.connection.collections.recipes.drop()
})