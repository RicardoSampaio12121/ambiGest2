const { json } = require('express');
var mqtt = require('mqtt')
var client = mqtt.connect("mqtt://test.mosquitto.org");

exports.loginMqtt = async (loginEntity) => {
    client.subscribe('credentials/authentication/loginResponse/' + loginEntity.email, { qos: 0 }, function (err, granted) {
        console.log("Subscribed to credentials/authentication/loginResponse");
    });
    
    client.publish('authentication/credentials/login', JSON.stringify(loginEntity))
    
    client.on('message', function (topic, message) {
        console.log("MESSAGE: " + message)

        client.unsubscribe('credentials/authentication/loginResponse/' + loginEntity.email);
        return message;
    });
}