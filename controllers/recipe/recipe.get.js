/**
 * Recipe GET
 * Author: Tristan Norton 2019
 */

// Dependencies
const Recipe = require('../../models/recipe/recipe')
const Ingredient = require('../../models/ingredient/ingredient')

const getRecipe = async id => {

    const queriedRecipe = await Recipe.findById(id)
    let returnRecipe = {};

    const ingredientPromises = queriedRecipe.ingredientsRequired.map(ingredientRequired => {
        return Ingredient.findById(ingredientRequired.ingredient)
    })

    await Promise.all(ingredientPromises).then(ingredients => {
        returnRecipe = {
            ...queriedRecipe,
            availibleIngredients: ingredients,
        }
    })

    console.log(returnRecipe)

}

module.exports = getRecipe