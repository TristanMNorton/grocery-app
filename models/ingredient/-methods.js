/**
 * Ingredients Model Instance Methods
 * Author: Tristan Norton 2019
 */

// Dependencies
const moment = require('moment');

const methods =  {

    /**
     * Produces a message based on how close
     * the ingredient is to expiring.
     */
    getExpirationMessage: function() {
        let todaysDate = moment();
        let diff = todaysDate.diff(this.expiration, 'days');


        if (diff > 0) {
            return "This is expired!";
        } else if (diff === -2) {
            return "This will expire in 2 days";
        } else if (diff === -1) {
            return "This ingredient will expire tomorrow";
        } else if (diff === 0) {
            return "This ingredient expires today";
        } else {
            return "You're good";
        }
    }
}

module.exports = methods;