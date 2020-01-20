/**
 * Ingredient GET, POST and PUT routing
 * Author: Tristan Norton 2019
 */

// Dependencies
const express = require('express')
const router = express.Router()
const ingredientPost = require('../controllers/ingredient/ingredient.post')
const ingredientPut = require('../controllers/ingredient/ingredient.put')

/**
 * Ingredient POST
 * TODO: Error Handling
 */
router.post('/', async function (req, res, next) {
    const response = await ingredientPost(req.body)
    .catch(next)

    res.send(response)
})

/**
 * Ingredient PUT
 * TODO: Error Handling
 */
router.put('/:id', async function (req, res, next) {
    const updateResponse = await ingredientPut(req.params.id, req.body)
    res.send(updateResponse)
})


module.exports = router
