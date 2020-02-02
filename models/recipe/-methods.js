/**
 * Recipe Model Instance Methods
 * Author: Tristan Norton 2019
 */

// Dependencies
const Ingredient = require('../../models/ingredient/ingredient')

const methods =  {

    /**
     * Gets Ingredients availible
     */
    getIngredientsAvailible: function() {

        const ingredientsRequired = this.ingredientsRequired;

        console.log(ingredientsRequired);
    }

}

module.exports = methods