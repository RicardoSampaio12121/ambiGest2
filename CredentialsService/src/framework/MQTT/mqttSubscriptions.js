var mqtt = require('mqtt');
const { json } = require('express');
const { CredentialsEntity } = require('../../entities/CredentialsEntity');
const { CredsLogin } = require('../../entities/credsLogin')
var client = mqtt.connect("mqtt://test.mosquitto.org");

const credentialsIterator = require('../../use-cases/checkCredentialsMongoDB');
const checkCredentialsIteratorMongo = require('../../use-cases/checkCredentialsMongoDB');
const signupIteratorMongo = require('../../use-cases/addCredentialsPersistencePSQL');
const iterator = require('../../use-cases/credentialsInteractorMongoDB');
const updatePassPersistence = require('../../use-cases/updatePasswordPersistencePSQL');
const deleteCredentialsPersistence = require ('../../use-cases/deleteCredentialsPersistencePSQL');

client.subscribe('authentication/credentials/login', { qos: 0 }, function (err, granted) {
    console.log("Subscrito ao authentication/credentials/login");
});

client.subscribe('authentication/credentials/signup', { qos: 0 }, function (err, granted) {
    console.log("Subscrito ao authentication/credentials/signup");
})

client.subscribe('authentication/credentials/changePassword', {qos: 0}, function(err, granted) {
    console.log("Subscribed to authentication/credentials/changePassword")
})

client.subscribe('users/credentials/deleteUserCreds', {qos: 0}, function(err, granted){
    console.log("Subscribed to users/credentials/deleteUserCreds")
})

async function doWorkAsync(email, password) {
    var creds = await credentialsIterator
        .checkCredentialsPersistence(
            checkCredentialsIteratorMongo,
            { email, password });

    client.publish(
        'credentials/authentication/loginResponse',
        JSON.stringify(creds));
}

async function doSignupAsync(email, password) {
    var response = await iterator.addCredentialsIterator(signupIteratorMongo, { email, password });
    console.log("Response: " + response);

    client.publish('credentials/authentication/signupResponse/' + email, JSON.stringify(response));
}

async function doChangePasswordAsync(email, newPassword){
    var response = await iterator.updatePassword(updatePassPersistence, {email, newPassword})
    client.publish('credentials/authentication/changePassword/' + email, JSON.stringify(response))
}

async function doDeleteCredsAsync(email){
    var response = await iterator.deleteCredentials(deleteCredentialsPersistence, {email})
    client.publish('users/authentication/deleteUserCredsResponse/' + email, JSON.stringify(response));
}

client.on('message', function (topic, message) {
console.log("Recebe a mensage");

    switch (topic) {
        case 'authentication/credentials/login': //Login

            var msgObject = JSON.parse(message)
            doWorkAsync(msgObject.email, msgObject.password);
            break;

        case 'authentication/credentials/signup': //Registo
            console.log("Message: " + message);
            var msgObject = JSON.parse(message)

            doSignupAsync(msgObject.email, msgObject.password);
            break;
        case 'authentication/credentials/changePassword':
            var msgObject = JSON.parse(message);
            doChangePasswordAsync(msgObject.email, msgObject.newPassword)
            break;
        case 'users/credentials/deleteUserCreds':
            var msgObject = JSON.parse(message)
            doDeleteCredsAsync(msgObject.email);
            break;
    }
});