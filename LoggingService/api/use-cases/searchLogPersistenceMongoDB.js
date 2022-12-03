const mongoose = require("mongoose");
const Log = require("../framework/db/mongoDB/logModel.js");

exports.searchLogPersistence = async (log) => {
  //console.log(log.type);
  //var tipo = log.type;
  var result = "Query not supported";
  var query = new RegExp(".*" + log.message + ".*");
  var tipo = new RegExp(".*" + log.type + ".*");

  console.log("Tipo:" + tipo);
  console.log("Search:" + query);
  switch (log.type) {
    case "login":
      if (query) {
        result = await Log.find({ type: tipo, message: query }).catch(function (
          err
        ) {
          if (err)
            return {
              status: "500",
              error:
                "There was an error trying to get all the users from the database.",
            };
        });
      } else {
      }
      result = await Log.find({ type: tipo })
        .sort({ _id: 1 })
        .limit(5)
        .catch(function (err) {
          if (err)
            return {
              status: "500",
              error:
                "There was an error trying to get all the users from the database.",
            };
        });
      break;
    case "null":
      result = await Log.find({ message: query }).catch(function (err) {
        if (err)
          return {
            status: "500",
            error:
              "There was an error trying to get all the users from the database.",
          };
      });
      break;
  }

  //console.log(query);

  return { status: "200", message: result };
};
