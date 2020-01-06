/**
 * Express App Setup
 * Author: Tristan Norton 2019
 */

 // Dependencies
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var mongoose = require('mongoose')

/**
 * DB Connection
 * TODO: Reference env variable for DB URL
 */
mongoose.connect('mongodb://localhost/grocery-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

// Routes
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var ingredientRouter = require('./routes/ingredient')

// Create App
var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'twig')

// Middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Apply Routers
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/ingredient', ingredientRouter)
app.use('/ingredient/:id', ingredientRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
