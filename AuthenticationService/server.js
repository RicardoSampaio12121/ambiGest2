var express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
//const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')


const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api", require('./api/controllers/routes/authenticationRoutes'));

let port = 8885
app.listen(port, () => {
    console.log('Server at ' + port)
})