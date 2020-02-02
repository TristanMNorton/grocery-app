/**
 * Recipe GET
 * Author: Tristan Norton 2019
 */

// Dependencies
const Recipe = require('../../models/recipe/recipe')
const Ingredient = require('../../models/ingredient/ingredient')

const getRecipe = async id => {

    const queriedRecipe = await Recipe.findById(id)

    queriedRecipe.availibleIngredients = await queriedRecipe.getIngredientsAvailible()

    return queriedRecipe

}

module.exports = getRecipe