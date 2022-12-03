const mongoose = require("mongoose");
const Log = require("../framework/db/mongoDB/logModel.js");
//require("../framework/db/mongoDB/logModel");

exports.createLogPersistence = async (log) => {
  //console.log(">" + log.type);
  //console.log(">" + log.message);

  let ts = Date.now();
  let date_ob = new Date(ts);
  let year = date_ob.getFullYear();
  let month = date_ob.getMonth() + 1;
  let day = date_ob.getDate();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  var date = year + "-" + month + "-" + day;
  var time = hours + ":" + minutes + ":" + seconds;

  //var dates = new Date().toISOString().substr(0, 19);
  // console.log(dates);
  //console.log(time);

  const newLog = new Log({
    type: log.type,
    date: date,
    time: time,
    message: log.message,
  });

  await newLog.save();

  return { status: "200", message: "Log Added" };
};
