var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://test.mosquitto.org");

const createLogPersistence = require("../../use-cases/createLogPersistenceMongoDB");
const iterator = require("../../use-cases/logIteratorMongoDB");

client.subscribe(
  "logs/addLog",
  { qos: 0 },
  function (err, granted) {
    console.log("Subscried to topic: 'logs/addLog'");
  }
);

async function doAddLogAsync(message, type) {

  const a = await iterator.createLogIterator(createLogPersistence, { type, message });
  console.log(a);
}

client.on("message", function (topic, message) {
  console.log("Entra no topico");
  var msgObject = JSON.parse(message);

  console.log(msgObject);
  const a = doAddLogAsync(msgObject.message, msgObject.type);
}
);
