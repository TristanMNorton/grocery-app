/**
 * Saving Test
 * Author: Tristan Norton 2019
 */

const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const assert = require('assert')
const moment = require('moment')
const Ingredient = require('../..//models/ingredient/ingredient')

describe('Ingredient Methods', function () {
  /**
     * Tests days til expiration
     */
  it('gets days until ingredient expiration', function () {
    const banana = new Ingredient({
      name: 'Banana',
      quantityType: 'weight',
      expiration: moment().add(3, 'd')
    })

    const daysUntilExpiration = banana.getDaysUntilExpiration()

    assert(daysUntilExpiration === -2)
  })
})
