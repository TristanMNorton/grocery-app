/**
 * Posting Test
 * Author: Tristan Norton 2019
 */

const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const assert = require('assert')
const Ingredient = require('../../models/ingredient/ingredient')
const ingredientPost = require('../../controllers/ingredient/ingredient.post')

describe('Posting ingredient', function () {
  const bananaConfig = {
    name: 'Banana',
    quantityType: 'weight'
  }

  /**
     * Ingredient post test
     */
  it('Posts an ingredient to the database', async function () {
    await ingredientPost(bananaConfig)

    await Ingredient.findOne({ name: bananaConfig.name })
      .then(function (result) {
        assert(result.name === bananaConfig.name)
      })
  })
})
