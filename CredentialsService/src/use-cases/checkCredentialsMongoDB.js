const { configDB } = require("../framework/db/Postgresql/config")
const https = require('https');
const jwt = require('jsonwebtoken');
const { Client } = require('pg')
const client = new Client(configDB)
var mqtt = require('mqtt')
var mqttClient = mqtt.connect("mqtt://test.mosquitto.org");

client.connect()
const bcrypt = require('bcryptjs');
const { json } = require("express");
const JWT_SECRET = process.env.JWT_SECRET

exports.checkCredentialsPersistence = async (email, password) => {

    const res = await client.query('SELECT * FROM public.credentials WHERE email = $1;', [email])

    if(res.rowCount == 0) return {status: '500', message: 'There are no records in the database.'}

    if (res.rows[0].verified == false) {
        return { status: '500', error: 'User not verified' }
    }
    else {
        const comparison = bcrypt.compareSync(password, res.rows[0].password);
        if (comparison) {
            try {
                const token = jwt.sign({
                    "UserInfo" : {
                        "email": email,
                        "role": res.rows[0].role
                    }
                },
                    JWT_SECRET,
                    {
                        expiresIn: 86400
                    }
                )
                var loginLog = {type: "login", message: "Login successfull"}

                mqttClient.publish('logs/addLog', JSON.stringify(loginLog) )

                return { status: '200', message: token }

            } catch (error) {
                return { status: '500', message: error }
            }
        }else{
            var loginFailureLog = {type: "login", message: "Login not successfull"}
            mqttClient.publish('logs/addLog', JSON.stringify(loginFailureLog))
        }
    }
}