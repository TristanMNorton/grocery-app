/**
 * Ingredient SAVE
 * Author: Tristan Norton 2019
 */

const mocha = require('mocha')
const Ingredient = require('../../models/ingredient/ingredient')

const saveIngredient = async (body) => {
    const newIngredient = new Ingredient(body)

    const result = await newIngredient.save()

    console.log(result);

    if (!result) {
        return false
    }

    return result;
}

module.exports = saveIngredient