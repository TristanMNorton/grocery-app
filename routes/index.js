var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  const options = { root: process.cwd() }

  res.set('Content-Type', 'text/html')

  res.sendFile('public/index.html', options, error => {
    if (error) {
      res.writeHead(500)
      res.end()
    }
  })
})

module.exports = router
