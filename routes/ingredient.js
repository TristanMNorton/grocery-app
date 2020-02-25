/**
 * Ingredient GET, POST and PUT routing
 * Author: Tristan Norton 2019
 */

// Dependencies
const express = require('express')
const router = express.Router()
const ingredientPost = require('../controllers/ingredient/ingredient.post')
const ingredientPut = require('../controllers/ingredient/ingredient.put')
const ingredientGet = require('../controllers/ingredient/ingredient.get')

/**
 * Ingredient POST
 */
router.post('/', async function (req, res, next) {
  const response = await ingredientPost(req.body)
    .catch(next)

  res.send(response)
})

/**
 * Ingredient PUT
 */
router.put('/:id', async function (req, res) {
  const updateResponse = await ingredientPut(req.params.id, req.body)
  res.send(updateResponse)
})

/**
 * Ingredient GET
 */
router.get('/:id', async function (req, res) {
  const ingredient = await ingredientGet(req.params.id, req)
  res.send({
    data: ingredient,
    links: {
      self: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
      related: `${req.protocol}://${req.headers.host}${req.baseUrl}`
    }
  })
})

module.exports = router
