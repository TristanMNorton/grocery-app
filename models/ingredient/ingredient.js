/**
 * Ingredients Model and Schema
 * Author: Tristan Norton 2019
 */

// Dependencies
const mongoose = require('mongoose')
const Model = mongoose.model
const methods = require('./-methods')

// Schema
const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: async value => {
        const result = await Ingredient.findOne({ name: value })

        return result === null
      },
      message: props => `The ingredient ${props.value} already exists!`
    }
  },
  quantity: {
    type: Number,
    default: 0
  },
  quantityType: {
    type: String,
    required: true
  },
  expiration: Date,
  photo: String
})

// Add Methods
ingredientSchema.methods = methods

const Ingredient = new Model('Ingredient', ingredientSchema)

module.exports = Ingredient
