/**
 * PUT Test
 * Author: Tristan Norton 2019
 */

const mocha = require('mocha')
const assert = require('assert')
const Ingredient = require('../../models/ingredient/ingredient')
const ingredientPut = require('../../controllers/ingredient/ingredient.put')

describe('Putting ingredient', function() {

    /**
     * Ingredient put test
     */   
    it('Posts an ingredient to the database', async function() {
        const banana = new Ingredient({
            name: 'Banana',
            quantityType: 'weight'
        })

        await banana.save()

        const updateConfig = {
            quantityType: 'count'
        }

        const updateResult = await ingredientPut(banana._id, updateConfig)

        assert(updateResult.quantityType === updateConfig.quantityType)
    })
    
})