const { json } = require('express');
var mqtt = require('mqtt')
var client = mqtt.connect("mqtt://test.mosquitto.org");

exports.deleteUserCredsMqtt = async (email) => {
    client.subscribe('users/authentication/deleteUserCredsResponse/' + email, { qos: 0 }, function (err, granted) {
        console.log("Subscribed to users/authentication/deleteUserCredsResponse/" + email);
    });
    
    client.publish('users/credentials/deleteUserCreds', JSON.stringify(email))
    
    client.on('message', function (topic, message) {
        console.log("MESSAGE: " + message)

        client.unsubscribe('credentials/users/deleteUserCreds/' + email);
        return message;
    });
}