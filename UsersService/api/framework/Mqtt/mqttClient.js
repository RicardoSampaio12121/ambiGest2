var mqtt = require('mqtt');
var client = mqtt.connect("mqtt://test.mosquitto.org");

const createUser = require('../../use-cases/createUserPersistenceMongoDB');
const iterator = require('../../use-cases/usersIteratorMongoDB');

client.subscribe('authentication/users/addInfo', {qos: 0}, function(err, granted){
    console.log("Subscried to topic: 'authentication/users/addInfo'");
})

async function doAddInfoAsync(name, surname, email, birthdate, code){

    console.log(code);
    const a = await iterator.createUserIterator(createUser, {name, surname, email, birthdate, code})
    
    client.publish('credentials/authentication/addUserInfoResponse/' + email, JSON.stringify(a));
    return a;
}



client.on("message", function(topic, message){
    if(topic == 'authentication/users/addInfo'){
        var msgObject = JSON.parse(message)
        console.log(msgObject)
        const a = doAddInfoAsync(msgObject.name, msgObject.surname, msgObject.email, msgObject.birthdate, msgObject.code);
    }
});