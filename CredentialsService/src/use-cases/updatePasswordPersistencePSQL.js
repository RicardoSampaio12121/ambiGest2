const {getClient, query, queryParams} = require("../framework/db/Postgresql/client")

exports.updatePasswordPersistence = async(email, newPassword) => {

    getClient((errClient, client) => {
        queryParams("UPDATE public.credentials SET password = $1 WHERE email = $2 RETURNING email;", [newPassword, email], (err, res) => {
            if(res.rows[0] == null){
                return({status: '500', error: 'It was not possible to update the password'});
            }
            
            client.end();
        }, client);
    });
}