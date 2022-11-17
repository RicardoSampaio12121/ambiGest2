const { Client } = require('pg')
const {configDB} = require("./config")

module.exports = {
    query: (text, callback, client) => {
        return client.query(text, (err, res) => {
            callback(err, res);
        })
    },

    queryParams: (text, params, callback, client) => {
      
        return client.query(text, params, (err, res) => {
      
          callback(err, res);
        });
      },

      getClient: (callback) => {
        // const start = Date.now();
      
        const client = new Client(configDB);
      
        client.connect((err, client, done) => {
          // const duration = Date.now() - start;
      
          // log.info({duration: duration}, "New Client Connected");
          callback(err, client, done);
        });
      }
}