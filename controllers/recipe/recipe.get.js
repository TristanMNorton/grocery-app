/**
 * Recipe GET
 * Author: Tristan Norton 2019
 */

// Dependencies
const Recipe = require('../../models/recipe/recipe')
const Ingredient = require('../../models/ingredient/ingredient')

const getRecipe = async id => {

    /**
     * If querying a specific record
     */
    if (id) {
        const queriedRecipe = await Recipe.findById(id)
    
        await queriedRecipe.getIngredientsAvailible()
        queriedRecipe.getPercentageOfIngredientsAvailible()
    
        return queriedRecipe
    }

    /**
     * Query all records
     */
    const queriedRecipes = await Recipe.find({})

    const finalRecipes = await queriedRecipes.map(async recipe => {
        await recipe.getIngredientsAvailible()
        recipe.getPercentageOfIngredientsAvailible()
        
        return recipe
    })

    return Promise.all(finalRecipes)
        .then(results => {
            return results
        })

}

module.exports = getRecipe