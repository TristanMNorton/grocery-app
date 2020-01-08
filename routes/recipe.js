/**
 * Recipe GET, POST and PUT routing
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
    const saveResponse = await recipePost(req.body)
    res.send(saveResponse)
})

/**
 * Ingredient PUT
 * TODO: Error Handling
 */
router.put('/:id', async function (req, res, next) {
    const updateResponse = await recipePut(req.params.id, req.body)
    res.send(updateResponse)
})


module.exports = router
