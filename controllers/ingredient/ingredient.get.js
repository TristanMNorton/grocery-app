/**
 * Ingredient GET
 * Author: Tristan Norton 2019
 */

// Dependencies
const Ingredient = require('../../models/ingredient/ingredient')

const getIngredient = async id => {
    
    return await Ingredient.findById(id)

}

module.exports = getIngredient