'use strict';
const {configDB} = require("./src/framework/db/Postgresql/config")

var mqtt = require('mqtt');
var mqttclient = mqtt.connect("mqtt://test.mosquitto.org");

const { Client } = require('pg')
const client = new Client(configDB)

client.connect()

client.query('CREATE TABLE IF NOT EXISTS credentials(id SERIAL PRIMARY KEY, email TEXT NOT NULL, password TEXT NOT NULL, verified BOOLEAN NOT NULL, code TEXT NOT NULL,role TEXT NOT NULL);')

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

app.listen(3002, (req, res) => {
    console.log('Listening on port: ' + 3002)
})