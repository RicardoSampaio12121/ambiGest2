"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LogSchema = new Schema(
  {
    type: { type: String },
    date: { type: String },
    time: { type: String },
    message: { type: String, require: true },
  },
  { collection: "Logs" }
);

const Log = mongoose.model("Log", LogSchema);

module.exports = Log;
