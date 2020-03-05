/**
 * Recipe PATCH
 * Author: Tristan Norton 2019
 *
 * @param String [id] Record ID of recipe
 * @param Object [updateObject] Data updates for record
 */

// Dependencies
const Recipe = require('../../models/recipe/recipe')

const updateRecipe = async (id, updateObject) => {
  const result = await Recipe.findByIdAndUpdate(id, updateObject, { new: true })

  return result
}

module.exports = updateRecipe
