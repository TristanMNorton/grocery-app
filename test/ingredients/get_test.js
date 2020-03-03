/**
 * Getting Test
 * Author: Tristan Norton 2019
 */

const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const assert = require('assert')
const ingredientPost = require('../../controllers/ingredient/ingredient.post')
const ingredientGet = require('../../controllers/ingredient/ingredient.get')

describe('Getting ingredient', function () {
  const bananaConfig = {
    name: 'Banana',
    quantityType: 'weight'
  }

  /**
   * Get ingredient by id
   */
  it('Gets an ingredient from the database by id', async function () {
    const result = await ingredientPost(bananaConfig)

    await ingredientGet(result._id)
      .then(function (getResult) {
        assert(getResult.attributes.name === bananaConfig.name)
      })
  })
})
