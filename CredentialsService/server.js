'use strict';
var mqtt = require('mqtt');
var client = mqtt.connect("mqtt://test.mosquitto.org");

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config();

const app = express()


app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

require("./src/framework/MQTT/mqttSubscriptions");


app.use("/api", require("./src/controllers/routes/credentialsRoutes"));

app.listen(8887, (req, res) => {
    console.log('Listening on port: ' + 8887)
})