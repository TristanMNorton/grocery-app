/**
 * Ingredients Model and Schema
 * Author: Tristan Norton 2019
 */

// Dependencies
const mongoosePaginate = require('mongoose-paginate-v2')
const mongoose = require('mongoose')
const Model = mongoose.model
const methods = require('./_methods')

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
  daysUntilExpiration: Number,
  expiration: Date,
  photo: String
})

ingredientSchema.plugin(mongoosePaginate)

// Add Methods
ingredientSchema.methods = methods

const Ingredient = new Model('Ingredient', ingredientSchema)

module.exports = Ingredient
