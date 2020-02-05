/**
 * Unit Test
 * Author: Tristan Norton 2020
 */

const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const assert = require('assert')
const Recipe = require('../..//models/recipe/recipe')
const Ingredient = require('../../models/ingredient/ingredient')

describe('Recipe Methods', function () {
  /**
     * Reusable Ingredient Configs
     */
  const saltConfig = {
    name: 'Salt',
    quantityType: 'tablespoon',
    quantity: 5
  }

  const bananaConfig = {
    name: 'Banana',
    quantityType: 'weight',
    quantity: 4
  }

  /**
     * Individial ingredient availibility calculations
     */
  it('Gets individual ingredient availibility on a recipe', async function () {
    const salt = await new Ingredient(saltConfig).save()
    const banana = await new Ingredient(bananaConfig).save()

    const bologneseConfig = {
      name: 'Bolognese',
      instructions: 'You cook it...',
      ingredientsRequired: [
        {
          ingredient: salt._id,
          quantityRequired: 10
        },
        {
          ingredient: banana._id,
          quantityRequired: 10
        }
      ]
    }

    const bolognese = await new Recipe(bologneseConfig).save()

    await bolognese.getPercentageOfIngredientsAvailible()
    await bolognese.getIngredientsAvailible()

    assert(
      bolognese.availibleIngredients[0].percentage === 0.5 &&
            bolognese.availibleIngredients[1].percentage === 0.4
    )
  })

  /**
     * Aggregated total ingredient percentage availibility
     */
  it('Gets total aggregated ingredient availibility for a recipe', async function () {
    const salt = await new Ingredient(saltConfig).save()
    const banana = await new Ingredient(bananaConfig).save()

    const bologneseConfig = {
      name: 'Bolognese',
      instructions: 'You cook it...',
      ingredientsRequired: [
        {
          ingredient: salt._id,
          quantityRequired: 10
        },
        {
          ingredient: banana._id,
          quantityRequired: 10
        }
      ]
    }

    const bolognese = await new Recipe(bologneseConfig).save()

    await bolognese.getPercentageOfIngredientsAvailible()
    await bolognese.getIngredientsAvailible()

    assert(bolognese.ingredientPercentage === 0.45)
  })
})
