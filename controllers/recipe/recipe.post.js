/**
 * Recipe SAVE
 * Author: Tristan Norton 2019
 */

// Dependencies
const Recipe = require('../../models/recipe/recipe')

const saveRecipe = async recipe => {
    const newRecipe = new Recipe(recipe)

    const result = await newRecipe.save()

    return result
}

module.exports = saveRecipe
