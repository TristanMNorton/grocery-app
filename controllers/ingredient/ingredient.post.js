/**
 * Ingredient SAVE
 * Author: Tristan Norton 2019
 */

// Dependencies
const Ingredient = require('../../models/ingredient/ingredient')

const saveIngredient = async ingredient => {
    const newIngredient = new Ingredient(ingredient)

    const result = await newIngredient.save()

    if (!result) {
        return false
    }

    return result
}

module.exports = saveIngredient
