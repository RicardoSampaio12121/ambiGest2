require('../models/UserModel')
const { getClient, query, queryParams } = require("../external/Postgresql/postgresqlClient")
exports.checkCredentials = async(req, res) => {
    
}

exports.updatePassword = async(req, res) => {

}

exports.deleteUserRecords = async(req, res) => {

}

exports.addCredentials = async(req, res) => {
    const { user } = req.body

    //var newUser = new UserModel(user.email, user.password, false)

    getClient((errClient, client) => {
        if(errClient){
            res.status(500).json({auth: false, message: "There was an error trying to connect to the client"})
        }

        queryParams('INSERT INTO public.users (email, password, verified) VALUES($1, $2, $3);', [user.email, user.password, false], (err) => {
            client.end();
            if(err) res.status(201).json({auth: false, message: err.message}); 
            else res.status(200).json({auth: false, message: "Success"});
            
        }, client);
    });
}