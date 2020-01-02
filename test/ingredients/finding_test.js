/**
 * Finding Test
 * Author: Tristan Norton 2019
 */

const mocha = require('mocha')
const assert = require('assert')
const Ingredient = require('../../models/ingredient/ingredient')

describe('Finding an ingredient', function() {

    beforeEach(function(done) {
        const banana = new Ingredient({
            name: 'Banana',
            quantityType: 'weight'
        })

        banana.save().then(function() {
            done()
        })
    })
    
    it('Finds one ingredient in the database', function(done) {
        
        Ingredient.findOne({ name: 'Banana' })
            .then(function(result){
                assert(result.name === 'Banana')
                done()
            })

    })
})