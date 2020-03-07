var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  const options = { root: __dirname }

  res.sendFile('dist/index.html', options, error => {
    if (error) {
      res.writeHead(500)
      res.end()
    }
  })
})

module.exports = router
