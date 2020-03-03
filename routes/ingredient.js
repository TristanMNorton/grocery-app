/**
 * Ingredient GET, POST and PATCH routing
 * Author: Tristan Norton 2019
 */

// Dependencies
const express = require('express')
const router = express.Router()
const ingredientPost = require('../controllers/ingredient/ingredient.post')
const ingredientPatch = require('../controllers/ingredient/ingredient.patch')
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
 * Ingredient PATCH
 */
router.patch('/:id', async function (req, res) {
  const id = req.params.id
  const data = req.body.data

  const patchResponse = await ingredientPatch(id, data)
  res.send(patchResponse)
})

/**
 * Ingredient GET
 */
router.get('/:id', async function (req, res) {
  const id = req.params.id

  const ingredient = await ingredientGet(id, req)

  res.send({
    data: ingredient,
    links: {
      self: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
      related: `${req.protocol}://${req.headers.host}${req.baseUrl}`
    }
  })
})

module.exports = router
