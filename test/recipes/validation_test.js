/**
 * Posting Test
 * Author: Tristan Norton 2019
 */

const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const assert = require('assert')
const recipePost = require('../../controllers/recipe/recipe.post')
const ingredientPost = require('../../controllers/ingredient/ingredient.post')

describe('Posting recipe', function () {
  /**
   * Same name test
   */
  it('Disallows saving recipe of same name', async function () {
    const bologneseConfig = {
      name: 'Bolognese',
      instructions: 'You cook it...'
    }

    await recipePost(bologneseConfig)

    await recipePost(bologneseConfig).catch(err => {
      assert(err.errors.name.message === 'The recipe Bolognese already exists!')
    })
  })

  /**
   * Lack of name test
   */
  it('Disallows saving recipe without name', async function () {
    const bologneseConfig = {
      instructions: 'You cook it...'
    }

    await recipePost(bologneseConfig).catch(err => {
      assert(err.errors.name.message === 'Path `name` is required.')
    })
  })

  /**
   * Has instructions test
   */
  it('Disallows saving recipe without instructions', async function () {
    const bologneseConfig = {
      name: 'Bolognese'
    }

    await recipePost(bologneseConfig).catch(err => {
      assert(err.errors.instructions.message === 'Path `instructions` is required.')
    })
  })

  /**
   * Ingredient has quantity test
   */
  it('Disallows saving recipe without a quantity associated with a required ingredient', async function () {
    const bananaConfig = {
      name: 'Banana',
      quantityType: 'weight'
    }

    const bananaEntry = await ingredientPost(bananaConfig)

    const bologneseConfig = {
      name: 'Bolognese',
      instructions: 'You cook it...',
      ingredientsRequired: [
        {
          ingredient: bananaEntry._id
        }
      ]
    }

    await recipePost(bologneseConfig).catch(err => {
      assert(err.errors['ingredientsRequired.quantityRequired'] === 'quantityRequired')
    })
  })
})
