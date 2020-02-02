/**
 * Recipe GET
 * Author: Tristan Norton 2019
 */

// Dependencies
const Recipe = require('../../models/recipe/recipe')
const Ingredient = require('../../models/ingredient/ingredient')

const getRecipe = async id => {

    const queriedRecipe = await Recipe.findById(id)

    await queriedRecipe.getIngredientsAvailible()
    queriedRecipe.getPercentageOfIngredientsAvailible()

    return queriedRecipe

}

module.exports = getRecipe