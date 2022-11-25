const {getClient, query, queryParams} = require("../framework/db/Postgresql/client")

exports.deleteCredentialsPersistence = async(email) => {
    
    getClient((errClient, client) => {
        queryParams("DELETE FROM public.credentials WHERE email = $1 RETURNING *;", [email], (err, res) => {
            if(res.rows[0] == null){
                return({status: '500', error: "There are no credentials with the given email address."});
            }            
            client.end();
        })
    });

    return({status: '200', message: "Credentials deleted successfully."});
}