/**
 * Ingredient GET and POST routing
 * Author: Tristan Norton 2019
 */

// Dependencies
const express = require('express')
const router = express.Router()
const ingredientPost = require('../controllers/ingredient/ingredient.post')

/**
 * Ingredient POST
 */
router.post('/', async function(req, res, next) {
    const saveResponse = await ingredientPost(req.body);
    res.send(saveResponse);
});

module.exports = router;
