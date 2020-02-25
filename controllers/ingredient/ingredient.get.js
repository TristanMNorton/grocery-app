/**
 * Ingredient GET
 * Author: Tristan Norton 2019
 */

// Dependencies
const Ingredient = require('../../models/ingredient/ingredient')

const getIngredient = async id => {
  const ingredient = await Ingredient.findById(id)

  return {
    type: 'ingredient',
    id: ingredient._id,
    attributes: ingredient
  }
}

module.exports = getIngredient
