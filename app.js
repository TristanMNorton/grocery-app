/**
 * Express App Setup
 * Author: Tristan Norton 2019
 */

/**
 * Dependencies
 */
const dotenv = require('dotenv')
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')

/**
 * Env init
 */
dotenv.config()

/**
 * DB Connection
 * TODO: Reference env variable for DB URL
 */
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

/**
 * Routes
 */
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const ingredientRouter = require('./routes/ingredient')
const recipeRouter = require('./routes/recipe')

/**
 * Create App
 */
const app = express()

/**
 * View Engine Setup
 */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'twig')

/**
 * Middleware
 */
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/**
 * Apply Routers
 */
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/api/v1/ingredient', ingredientRouter)
app.use('/api/v1/ingredient/:id', ingredientRouter)
app.use('/api/v1/recipe', recipeRouter)
app.use('/api/v1/recipe/:id', recipeRouter)

/**
 * 404 Processing
 */
app.use(function (req, res, next) {
  next(createError(404))
})

/**
 * Error Handler
 */
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // Return error response as JSON
  res.status(err.status || 500)
  res.send(err)
})

module.exports = app
