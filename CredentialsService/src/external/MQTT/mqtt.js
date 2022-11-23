var mqtt = require('mqtt')
var client = mqtt.connect("mqtt://test.mosquitto.org")

client.subscribe('topic/checkCredentials', {qos: 1}, function(err, granted){
    if(err) console.log(err.message);
});

client.on("message", function(topic, message){
    var split = topic.split('/')

    switch(split[1]){
        case 'checkCredentials': 
            
            break;
    }
})