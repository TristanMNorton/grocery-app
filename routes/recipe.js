/**
 * Recipe GET, POST and PUT routing
 * TODO: this code is nearly identical to ingredient put and post routing,
 * how to abstract agnostically.
 * Author: Tristan Norton 2019
 */

// Dependencies
const express = require('express')
const router = express.Router()
const recipePost = require('../controllers/recipe/recipe.post')
const recipeGet = require('../controllers/recipe/recipe.get')
const recipePut = require('../controllers/recipe/recipe.put')

/**
 * Recipe POST
 * TODO: Error Handling
 */
router.post('/', async function (req, res, next) {
  const response = await recipePost(req.body)
    .catch(next)

  res.send(response)
})

/**
 * Recipe PUT
 * TODO: Error Handling
 */
router.put('/:id', async function (req, res, next) {
  const updateResponse = await recipePut(req.params.id, req.body)
  res.send(updateResponse)
})

/**
 * Recipe GET
 */
router.get('/:id', async function (req, res) {
  const updatedRecipe = await recipeGet(req.params.id, req)
  res.send(updatedRecipe)
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
