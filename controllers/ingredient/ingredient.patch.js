/**
 * Ingredient PATCH
 * Author: Tristan Norton 2019
 *
 * @param String [id] Record ID of ingredient
 * @param Object [updateObject] Data updates for record
 */

// Dependencies
const Ingredient = require('../../models/ingredient/ingredient')

const updateIngredient = async (id, updateObject) => {
  const result = await Ingredient.findByIdAndUpdate(id, updateObject, { new: true })

  return result
}

module.exports = updateIngredient
