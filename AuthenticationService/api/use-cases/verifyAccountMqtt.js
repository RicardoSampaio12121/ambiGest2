var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')

exports.verifyAccountMqtt = async (verifyAccountEntity) => {
    client.subscribe('credentials/authentication/verifyResponse/' + verifyAccountEntity.email)

    client.publish('authentication/credentials/verifyCode', JSON.stringify(verifyAccountEntity))

    client.on('message', function (topic, message) {
        console.log("MESSAGE: " + message)

        client.unsubscribe('credentials/authentication/verifyResponse/+')
        return message;
    });

}