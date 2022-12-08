var express = require("express"),
  aplicacao = express,
  porta = 5000;
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./api/static/swagger/swagger.json");

require("dotenv").config();

const uri = process.env.ATLAS_URI;
mongoose.Promise = global.Promise;

mongoose
  .connect(uri)
  .then(() => console.log("Connected to mongo"))
  .catch((err) =>
    console.error("It was not possible to connect to mongo: ", err)
  );

// require("./api/framework/db/mongoDB/logModel");
require("./api/framework/Mqtt/mqttClient");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", require("./api/controllers/routes/logRoutes"));
app.use("/", express.static(path.join(__dirname, "static")));
app.use("/apidoc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/apidocjs", express.static("./api/static/apidoc"));

let port = 3005;
app.listen(port, () => {
  console.log("Server at " + port);
});
