/**
 * Ingredients Model Instance Methods
 * Author: Tristan Norton 2019
 */

// Dependencies
const moment = require('moment')

const methods = {

  /**
   * Produces days until expiration
   */
  getDaysUntilExpiration: function () {
    return moment().diff(this.expiration, 'days')
  }

}

module.exports = methods
