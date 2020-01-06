/**
 * Ingredient UPDATE
 * Author: Tristan Norton 2019
 */

// Dependencies
const Ingredient = require('../../models/ingredient/ingredient')

const updateIngredient = async (id, updateObject) => {
  const result = await Ingredient.findByIdAndUpdate(id, updateObject, { new: true })
  
  if (!result) {
    return false
  }

  return result
}

module.exports = updateIngredient
