const { CredentialsEntity } = require("../entities/CredentialsEntity")
const client = require("../framework/db/Postgresql/client")
const { getClient, query, queryParams } = require("../framework/db/Postgresql/client")



exports.addCredentialsPersistence = async (email, password) => {
    //Check if there are credentials already created with the same email
    getClient((errClient, client) => {
         queryParams("SELECT * FROM public.credentials WHERE email = $1;", [email], (err, res) => {
             if (res.rows[0] != null) {
                return { status: '500', error: "This email is already in use." };
             }
         }, client);

        queryParams('INSERT INTO public.credentials (email, password, verified) VALUES ($1, $2, $3);', [email, password, false], (err) => {
            if (err) {
                console.log(err.message)
                return { status: '500', error: err }
            }
            client.end();

            var a = { status: '200', data: email }
            return a
        }, client);
    });

    return { status: '200', data: email }
}