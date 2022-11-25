const {getClient, query, queryParams} = require("../framework/db/Postgresql/client")

exports.updatePasswordPersistence = async(email, newPassword) => {

    getClient((errClient, client) => {
        queryParams("UPDATE public.credentials SET password = $1 WHERE email = $2;", [newPassword, email], (err, res) => {
            client.end();
        }, client);
    });
}