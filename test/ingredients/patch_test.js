/**
 * PATCH Test
 * Author: Tristan Norton 2019
 */

const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const assert = require('assert')
const Ingredient = require('../../models/ingredient/ingredient')
const ingredientPatch = require('../../controllers/ingredient/ingredient.patch')

describe('Putting ingredient', function () {
  /**
     * Ingredient patch test
     */
  it('Posts an ingredient to the database', async function () {
    const banana = new Ingredient({
      name: 'Banana',
      quantityType: 'weight'
    })

    await banana.save()

    const updateConfig = {
      quantityType: 'count'
    }

    const updateResult = await ingredientPatch(banana._id, updateConfig)

    assert(updateResult.quantityType === updateConfig.quantityType)
  })
})
