/**
 * Recipe Model Instance Methods
 * Author: Tristan Norton 2019
 */

// Dependencies
const Ingredient = require('../ingredient/ingredient')
const mongoose = require('mongoose')

const methods =  {

    /**
     * Gets Ingredients availible
     */
    getIngredientsAvailible: async function() {

        const ingredientsRequired = this.ingredientsRequired;

        return await Ingredient.find({
            '_id': { 
                $in: ingredientsRequired.map(ingredient => mongoose.Types.ObjectId(ingredient.ingredient._id))
            }
        }, (err, docs) => {
            return docs
        })

    }

}

module.exports = methods

