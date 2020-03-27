/**
 * Ingredient DELETE
 * Author: Tristan Norton 2020
 *
 * @param String [id] Record ID of ingredient
 */

// Dependencies
const Ingredient = require('../../models/ingredient/ingredient')

const deleteIngredient = async (id) => {
  const result = await Ingredient.findByIdAndDelete(id)

  return result
}

module.exports = deleteIngredient
