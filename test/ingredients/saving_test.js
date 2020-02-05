/**
 * Saving Test
 * Author: Tristan Norton 2019
 */

const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const assert = require('assert')
const Ingredient = require('../../models/ingredient/ingredient')

describe('Saving ingredient', function () {
  /**
     * Ingredient save test
     */
  it('Saves an ingredient to the database', function (done) {
    const banana = new Ingredient({
      name: 'Banana',
      quantityType: 'weight'
    })

    banana.save().then(function () {
      assert(!banana.isNew)
      done()
    })
  })
})
