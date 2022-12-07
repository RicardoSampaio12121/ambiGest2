var express = require('express'), aplicacao = express, porta = 5000
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.Promise = global.Promise;

mongoose.connect(uri)
    .then(() => console.log("Connected to mongo"))
    .catch(err => console.error("It was not possible to connect to mongo: ", err))

require('./src/framework/db/mongoDB/readingModel')

const app = express()
//app.use('/', express.static(path.join(__dirname,'static')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', require('./src/controllers/routes/readingsRoutes'))
app.use('/', express.static(path.join(__dirname,'static')))


let port = 3001
app.listen(port, () => {
    console.log('Server at ' + port)
})
