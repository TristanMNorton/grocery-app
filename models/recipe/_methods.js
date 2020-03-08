/**
 * Recipe Model Instance Methods
 * Author: Tristan Norton 2019
 */

// Dependencies
const Ingredient = require('../ingredient/ingredient')
const mongoose = require('mongoose')

const methods = {

  /**
   * Gets Ingredients availible
   */
  getIngredientsAvailible: async function () {
    const ingredientsRequired = this.ingredientsRequired

    await Ingredient.find({

      _id: {
        $in: ingredientsRequired
          .map(ingredient => mongoose.Types.ObjectId(ingredient.ingredient._id))
      }

    }, (err, docs) => {
      if (err) { throw err }

      this.availibleIngredients = docs.map(doc => {
        /**
         * Calculates individual percentage availibility on the fly
         */
        const [associatedIngredient] =
          this.ingredientsRequired
            .filter(ingredient =>
              doc._id.toString() ===
              ingredient.ingredient.toString())

        return {
          ...doc.toObject(),
          percentage: doc.quantity / associatedIngredient.quantityRequired
        }
      })
    })
  },

  /**
   * Calculate percentage of ingredients availible
   */
  getPercentageOfIngredientsAvailible: async function () {
    if (this.availibleIngredients.length < 1) {
      await this.getIngredientsAvailible()
    }

    /**
     * Aggregates required and availible quantities for
     * use in generating a total percentage of pantry availibility
     */
    const quantityInPosession =
        this.availibleIngredients
          .reduce((total, currentValue) =>
            total.quantity + currentValue.quantity)

    const quantityRequired =
        this.ingredientsRequired
          .reduce((total, currentValue) =>
            total.quantityRequired + currentValue.quantityRequired)

    this.ingredientPercentage = quantityInPosession / quantityRequired
  }

}

module.exports = methods
