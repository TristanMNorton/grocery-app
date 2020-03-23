/**
 * Ingredient SAVE
 * Author: Tristan Norton 2019
 *
 * @param Object [ingredient] Object of data for creating new ingredient
 */

// Dependencies
const Ingredient = require('../../models/ingredient/ingredient')
const measurementTypes = require('../../config/measurement-types')

const saveIngredient = async ingredient => {
  const abbreviation = ingredient.quantityType
  const name = measurementTypes[ingredient.quantityType]

  ingredient.quantityType = {
    abbreviation,
    name
  }

  const newIngredient = new Ingredient(ingredient)

  try {
    await Ingredient.validate(newIngredient)
  } catch (err) {
    err.status = 400
    throw err
  }

  const result = await newIngredient.save()

  return result
}

module.exports = saveIngredient
