var express = require('express')
var mockjs = require('mockjs')
var bodyParser = require('body-parser')
var api = require('./api')

var app = express();
var port = 8890

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./'))
app.use('/api/', api)

app.listen(port, () => {
    console.log('端口：' + port)
})


module.exports = app