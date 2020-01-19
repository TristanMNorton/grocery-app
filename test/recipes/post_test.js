/**
 * Posting Test
 * Author: Tristan Norton 2019
 */

const mocha = require('mocha')
const assert = require('assert')
const Recipe = require('../../models/recipe/recipe')
const recipePost = require('../../controllers/recipe/recipe.post')

describe('Posting recipe', function() {

    const bologneseConfig = {
        name: 'Bolognese',
        instructions: 'You cook it...'
    }
    
    it('Posts a recipe to the database', async function() {
        const result = await recipePost(bologneseConfig)

        await Recipe.findOne({ name: bologneseConfig.name })
            .then(function(result) {
                assert(result.name === bologneseConfig.name)
            })
    })

    it ('Disallows saving recipe of same name', async function() {
        const result = await recipePost(bologneseConfig)

        const duplicateName = await recipePost(bologneseConfig).catch(err => {
            assert(err.errors.name.message === 'The recipe Bolognese already exists!')
        })
    })
    
})