/**
 * Ingredient SAVE
 * Author: Tristan Norton 2019
 */

// Dependencies
const assert = require('assert')
const Ingredient = require('../../models/ingredient/ingredient')

const saveIngredient = async ingredient => {
    const newIngredient = new Ingredient(ingredient) 

    try {
        await Ingredient.validate(newIngredient)
    } catch (err) {
        throw err
    }

    const result = await newIngredient.save()

    return result
}

module.exports = saveIngredient
