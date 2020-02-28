/**
 * Recipe GET
 * Author: Tristan Norton 2019
 */

// Dependencies
const Recipe = require('../../models/recipe/recipe')
const ingredientGet = require('../ingredient/ingredient.get')

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
   * Query all records
   */
  const queriedRecipes = await Recipe.find({})

  const finalRecipes = await queriedRecipes.map(async recipe => {
    await recipe.getIngredientsAvailible()
    recipe.getPercentageOfIngredientsAvailible()

    return recipe
  })

  return Promise.all(finalRecipes)
    .then(results => {
      return results.map(result => {
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
      })
    })
}

module.exports = getRecipe
