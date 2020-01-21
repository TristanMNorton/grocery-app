/**
 * Validation Test
 * Author: Tristan Norton 2019
 */

const mocha = require('mocha')
const assert = require('assert')
const Ingredient = require('../../models/ingredient/ingredient')
const ingredientPost = require('../../controllers/ingredient/ingredient.post')

describe('Ingredient Validation Tests', function() {

    it('Disallows saving ingredient of same name', async function() {
        const bananaConfig = {
            name: 'Banana',
            quantityType: 'weight'
        }
        
        const result = await ingredientPost(bananaConfig)

        const duplicateName = await ingredientPost(bananaConfig).catch(err => {
            assert(err.errors.name.message === 'The ingredient Banana already exists!')
        })
    })
    
    it('Disallows saving ingredient without a name', async function() {
        const bananaConfig = {
            quantityType: 'weight'
        }

        await ingredientPost(bananaConfig).catch(err => {
            assert(err.errors.name.message === 'Path `name` is required.')
        })
    })
    
    it('Disallows saving ingredient without a quantity type', async function() {
        const bananaConfig = {
            name: 'Banana'
        }

        await ingredientPost(bananaConfig).catch(err => {
            assert(err.errors.quantityType.message === 'Path `quantityType` is required.')
        })
    })

})