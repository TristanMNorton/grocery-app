/**
 * Recipe GET
 * Author: Tristan Norton 2019
 *
 * @param String [id] ID of recipe being requested
 * @param Object [req] Express request object
 */

// Dependencies
const Recipe = require('../../models/recipe/recipe')

const getRecipe = async (id, req) => {
  /**
   * If querying a specific record
   */
  if (id) {
    const queriedRecipe = await Recipe.findById(id)

    await queriedRecipe.getIngredientsAvailible()
    queriedRecipe.getPercentageOfIngredientsAvailible()

    return {
      type: 'recipe',
      id: queriedRecipe._id,
      attributes: queriedRecipe,
      relationships: {
        ingredient: {
          links: {
            related: `${req.protocol}://${req.headers.host}/api/v1/ingredient`
          },
          data: queriedRecipe.ingredientsRequired.map(ingredient => {
            return {
              type: 'ingredient',
              id: ingredient.ingredient
            }
          })
        }
      }
    }
  }

  /**
   * Query and Paginate Records
   */

  // Grab requested page. Set to one if not requested.
  const requestedPage = req.query.page ? req.query.page * 1 : 1

  const paginatedRecipeData = await Recipe
    .paginate({}, {
      limit: 3,
      page: requestedPage
    })
    .then(result => result)

  const {
    page,
    totalPages,
    nextPage,
    prevPage,
    totalDocs
  } = paginatedRecipeData

  const paginatedData = {
    page,
    totalPages,
    nextPage,
    prevPage,
    totalDocs
  }

  /**
   * Run model defined methods to set remaining properties
   */
  const finalRecipes = await paginatedRecipeData.docs.map(async recipe => {
    await recipe.getIngredientsAvailible()
    await recipe.getPercentageOfIngredientsAvailible()

    return recipe
  })

  return Promise.all(finalRecipes)
    .then(results => {
      return {
        data: results.map(result => {
          return {
            type: 'recipe',
            id: result._id,
            attributes: result,
            relationships: {
              ingredient: {
                links: {
                  related: `${req.protocol}://${req.headers.host}/api/v1/ingredient`
                },
                data: result.ingredientsRequired.map(ingredient => {
                  return {
                    type: 'ingredient',
                    id: ingredient.ingredient
                  }
                })
              }
            }
          }
        }),
        paginatedData
      }
    })
}

module.exports = getRecipe
