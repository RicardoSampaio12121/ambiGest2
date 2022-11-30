const { json } = require('express');
var mqtt = require('mqtt')
var client = mqtt.connect("mqtt://test.mosquitto.org");
const { credentialsEntity } = require('../entities/credentialsEntity')
const { userInfo } = require('../entities/userInfoEntity')


exports.signupMqtt = async (signupEntity) => {
    client.subscribe('credentials/authentication/signupResponse/' + signupEntity.email, { qos: 0 }, function (err, granted) {
        console.log("Subscribed to credentials/authentication/signupResponse/" + signupEntity.email);
    });

    client.subscribe('credentials/authentication/addUserInfoResponse/' + signupEntity.email, {qos: 0}, function(err, granted){});

    const creds = new credentialsEntity(signupEntity.email, signupEntity.password)
    const info = new userInfo(signupEntity.email, signupEntity.name, signupEntity.surname, signupEntity.birthdate)

    client.publish('authentication/credentials/signup', JSON.stringify(creds))
    client.publish('authentication/users/addInfo', JSON.stringify(info))

    client.on('message', function (topic, message) {
        if (topic == 'credentials/authentication/signupResponse/' + signupEntity.email) {
            console.log(JSON.parse(message));
            client.unsubscribe('credentials/authentication/loginResponse' + signupEntity.email);
            return message;
        }

        if(topic == 'credentials/authentication/addUserInfoResponse/' + signupEntity.email){
            console.log("Mongo: " + JSON.parse(message))
            client.unsubscribe('credentials/authentication/addUserInfoResponse/' + signupEntity.email)
            return message;
        }
    });
}