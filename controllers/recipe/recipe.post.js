/**
 * Recipe SAVE
 * Author: Tristan Norton 2019
 */

// Dependencies
const Recipe = require('../../models/recipe/recipe')

const saveRecipe = async recipe => {
    const newRecipe = new Recipe(recipe)

    try {
        await Recipe.validate(newRecipe)
    } catch (err) {
        err.status = 400
        throw err
    }

    const result = await newRecipe.save()

    return result
}

module.exports = saveRecipe
