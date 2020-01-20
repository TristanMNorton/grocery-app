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


module.exports = router
