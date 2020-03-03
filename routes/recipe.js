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
  res.send({
    data: recipe,
    links: {
      self: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
      related: `${req.protocol}://${req.headers.host}${req.baseUrl}`
    }
  })
})

module.exports = router
