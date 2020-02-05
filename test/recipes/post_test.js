/**
 * Posting Test
 * Author: Tristan Norton 2019
 */

const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const assert = require('assert')
const Recipe = require('../../models/recipe/recipe')
const recipePost = require('../../controllers/recipe/recipe.post')

describe('Posting recipe', function () {
  const bologneseConfig = {
    name: 'Bolognese',
    instructions: 'You cook it...'
  }

  /**
     * Recipe post test
     */
  it('Posts a recipe to the database', async function () {
    await recipePost(bologneseConfig)

    await Recipe.findOne({ name: bologneseConfig.name })
      .then(result => {
        assert(result.name === bologneseConfig.name)
      })
  })
})
