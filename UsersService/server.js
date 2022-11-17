var express = require('express'), aplicacao = express, porta = 5000
 const path = require('path')
 const bodyParser = require('body-parser')
 const mongoose = require('mongoose')
 const jwt = require('jsonwebtoken')

const { application } = require('express');
const router = require('./api/routes/userRoute');


 require('dotenv').config();

 const uri = process.nextTick.ATLAS_URI;
 mongoose.Promise = global.Promise;

 mongoose.connect('mongodb://mongo:mongo@localhost:27017/?authMechanism=DEFAULT')
     .then(() => console.log("Connected to mongo"))
     .catch(err => console.error("It was not possible to connect to mongo: ", err))

 require("./api/models/userModel")

 const app=express()
 //app.use('/', express.static(path.join(__dirname,'static')))
 app.use(bodyParser.urlencoded({extended:false}))
 app.use(bodyParser.json())

 app.use("/api", require('./api/routes/userRoute'));

 let port = 8887
 app.listen(port, () => {
     console.log('Server at ' + port)
 })