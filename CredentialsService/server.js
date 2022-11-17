var express = require('express'), aplicacao = express, porta = 5000
 const path = require('path')
 const bodyParser = require('body-parser')
 //const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')

const { application } = require('express');
const router = require('./src/routes/credentialsRoutes');

 const app=express()

 app.use(bodyParser.urlencoded({extended:false}))
 app.use(bodyParser.json())

 app.use("/api", require('./src/routes/credentialsRoutes'));

 let port = 8886
 app.listen(port, () => {
     console.log('Server at ' + port)
 })