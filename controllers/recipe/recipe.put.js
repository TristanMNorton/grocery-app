/**
 * Recipe UPDATE
 * Author: Tristan Norton 2019
 */

// Dependencies
const Recipe = require('../../models/recipe/recipe')

const updateRecipe = async (id, updateObject) => {
  const result = await Recipe.findByIdAndUpdate(id, updateObject, { new: true })

  return result
}

module.exports = updateRecipe
