const { json } = require('express');
var mqtt = require('mqtt')
var client = mqtt.connect("mqtt://test.mosquitto.org");


exports.changePasswordMqtt = async (changePasswordEntity) => {
    client.subscribe('credentials/authentication/changePasswordResponse/' + changePasswordEntity.email, { qos: 0 }, function (err, granted) {
        console.log("Subscribed to credentials/authentication/changePassword/" + changePasswordEntity.email);
    });
    
    client.publish('authentication/credentials/changePassword', JSON.stringify(changePasswordEntity))
    
    client.on('message', function (topic, message) {
        console.log("MESSAGE: " + message)
        console.log(message);
        client.unsubscribe('credentials/authentication/changePasswordResponse/' + msgObject.email);
        return message;
    });
}