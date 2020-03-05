/**
 * Ingredient GET
 * Author: Tristan Norton 2019
 */

// Dependencies
const Ingredient = require('../../models/ingredient/ingredient')
const paginationConfig = require('../../config/_pagination.config')

const getIngredient = async (id, req) => {
  /**
   * If ID is provided, return single record
   */
  if (id) {
    const ingredient = await Ingredient.findById(id)

    return {
      type: 'ingredient',
      id: ingredient._id,
      attributes: ingredient
    }
  }

  /**
   * Query and Paginate Records
   */

  // Grab requested page. Set to one if not requested.
  const requestedPage = req.query.page ? req.query.page * 1 : 1

  const paginatedIngredientData = await Ingredient
    .paginate({}, {
      ...paginationConfig,
      page: requestedPage
    })
    .then(result => result)

  const {
    page,
    totalPages,
    nextPage,
    prevPage,
    totalDocs
  } = paginatedIngredientData

  const paginatedData = {
    page,
    totalPages,
    nextPage,
    prevPage,
    totalDocs
  }

  const finalIngredients = paginatedIngredientData.docs.map(ingredient => {
    ingredient.getDaysUntilExpiration()

    return ingredient
  })

  return {
    data: finalIngredients.map(ingredient => {
      return {
        type: 'ingredient',
        id: ingredient._id,
        attributes: ingredient
      }
    }),
    paginatedData
  }
}

module.exports = getIngredient
