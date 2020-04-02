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
const ingredientDelete = require('../controllers/ingredient/ingredient.delete')
const paginationLinks = require('../controllers/services/pageination-links')

/**
 * Ingredient POST
 */
router.post('/', async function (req, res, next) {
  const response = await ingredientPost(req.body)
    .catch(next)

  res.send(response)
})

/**
 * Ingredient DELETE
 */
router.delete('/:id', async function (req, res, next) {
  const id = req.params.id

  const response = await ingredientDelete(id)
    .catch(next)

  res.send(response)
})

/**
 * Ingredient PATCH
 */
router.patch('/:id', async function (req, res) {
  const id = req.params.id
  const data = req.body

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

router.get('/', async function (req, res) {
  const ingredient = await ingredientGet(null, req)
  const paginatedData = ingredient.paginatedData

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
  const data = ingredient.data

  /**
   * Merge data with pagination and respond
   */
  res.send({ data, links, meta })
})

module.exports = router
