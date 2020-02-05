/**
 * Validation Test
 * Author: Tristan Norton 2019
 */

const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const assert = require('assert')
const ingredientPost = require('../../controllers/ingredient/ingredient.post')

describe('Ingredient Validation Tests', function () {
  /**
   * Same name test
   */
  it('Disallows saving ingredient of same name', async function () {
    const bananaConfig = {
      name: 'Banana',
      quantityType: 'weight'
    }

    await ingredientPost(bananaConfig)

    await ingredientPost(bananaConfig).catch(err => {
      assert(err.errors.name.message === 'The ingredient Banana already exists!')
    })
  })

  /**
   * Has name test
   */
  it('Disallows saving ingredient without a name', async function () {
    const bananaConfig = {
      quantityType: 'weight'
    }

    await ingredientPost(bananaConfig).catch(err => {
      assert(err.errors.name.message === 'Path `name` is required.')
    })
  })

  /**
   * Ingredient has quantity type
   */
  it('Disallows saving ingredient without a quantity type', async function () {
    const bananaConfig = {
      name: 'Banana'
    }

    await ingredientPost(bananaConfig).catch(err => {
      assert(err.errors.quantityType.message === 'Path `quantityType` is required.')
    })
  })
})
