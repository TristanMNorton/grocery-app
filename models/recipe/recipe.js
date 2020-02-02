/**
 * Ingredients Model and Schema
 * Author: Tristan Norton 2019
 */

// Dependencies
const mongoose = require("mongoose")
const Ingredient = require('../ingredient/ingredient')
const methods = require('./-methods')
const Schema =  mongoose.Schema

// Schema
const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: async value => {
                const result = await Recipe.findOne({ name: value })

                return result === null
            },
            message: props => `The recipe ${props.value} already exists!`,
        },
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
    availibleIngredients: [{}],
    ingredientsRequired: [{
        ingredient: {
            type: Schema.Types.ObjectId,
            ref: 'Ingredient'
        },
        quantityRequired: {
            type: Number,
            required: true,
        },
    }]
})
// Add Methods
recipeSchema.methods = methods

const Recipe = new mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
