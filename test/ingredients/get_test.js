/**
 * Getting Test
 * Author: Tristan Norton 2019
 */

const mocha = require('mocha')
const assert = require('assert')
const Ingredient = require('../../models/ingredient/ingredient')
const ingredientPost = require('../../controllers/ingredient/ingredient.post')
const ingredientGet = require('../../controllers/ingredient/ingredient.get')

describe('Getting ingredient', function() {

    const bananaConfig = {
        name: 'Banana',
        quantityType: 'weight'
    }
 
    /**
     * Get ingredient by id
     */   
    it('Gets an ingredient from the database by id', async function() {
        const result = await ingredientPost(bananaConfig)

        await ingredientGet(result._id)
            .then(function(getResult) {
                assert(getResult.name === bananaConfig.name)
            })
    })
    
})