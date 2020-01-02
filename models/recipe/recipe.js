/**
 * Ingredients Model and Schema
 * Author: Tristan Norton 2019
 */

// Dependencies
const mongoose = require("mongoose")
const Schema =  mongoose.Schema

// Schema
const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
      type: Number,
      max: 5
  },
  photo: String,
  description: String,
  instructions: {
      type: String,
      require: true
  },
  ingredientsRequired: [{
      type: Schema.Types.ObjectId,
      ref: 'Ingredient'
  }]
})

const Recipe = new mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
