const { Client } = require('pg')
const {configDB} = require("./config")

module.exports = {
    query: (text, callback, client) => {
        return client.query(text, (err, res) => {
            console.log(text);
            console.log(err);
            console.log(res);

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
        
        console.log("Depois do client")
        client.connect((err, client, done) => {
          // const duration = Date.now() - start;
          
          console.log("Entra no connect");
          // log.info({duration: duration}, "New Client Connected");
          callback(err, client, done);
        });
      }
}