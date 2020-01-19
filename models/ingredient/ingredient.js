/**
 * Ingredients Model and Schema
 * Author: Tristan Norton 2019
 */

// Dependencies
const mongoose = require('mongoose')
const methods = require('./-methods')

// Schema
const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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

const Ingredient = new mongoose.model('Ingredient', ingredientSchema)

module.exports = Ingredient
