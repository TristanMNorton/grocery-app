/**
 * Recipe GET, POST and Patch routing
 * TODO: this code is nearly identical to ingredient patch and post routing,
 * how to abstract agnostically.
 * Author: Tristan Norton 2019
 */

// Dependencies
const express = require('express')
const router = express.Router()
const recipePost = require('../controllers/recipe/recipe.post')
const recipeGet = require('../controllers/recipe/recipe.get')
const recipePatch = require('../controllers/recipe/recipe.patch')
const paginationLinks = require('../controllers/services/pageination-links')

/**
 * Recipe POST
 */
router.post('/', async function (req, res, next) {
  const response = await recipePost(req.body)
    .catch(next)

  res.send(response)
})

/**
 * Recipe PATCH
 */
router.patch('/:id', async function (req, res, next) {
  const id = req.params.id
  const data = req.body.data

  const updateResponse = await recipePatch(id, data)
  res.send(updateResponse)
})

/**
 * Recipe GET
 */
router.get('/:id', async function (req, res) {
  const id = req.params.id

  const updatedRecipe = await recipeGet(id, req)

  res.send({
    data: updatedRecipe,
    links: {
      self: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
      related: `${req.protocol}://${req.headers.host}${req.baseUrl}`
    }
  })
})

router.get('/', async function (req, res) {
  const recipe = await recipeGet(null, req)
  const paginatedData = recipe.paginatedData

  /**
   * Set pagination urls if applicable
   */
  const links = paginationLinks(req, paginatedData)

  /**
   * Meta and Data
   */
  const meta = {
    ...paginatedData
  }
  const data = recipe.data

  /**
   * Merge data with pagination and respond
   */
  res.send({ data, links, meta })
})

module.exports = router
