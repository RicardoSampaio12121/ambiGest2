const {getClient, query, queryParams} = require("../framework/db/Postgresql/client")

exports.updateVerifyAccountPersistence = async(email, code) => {
    getClient((errClient, client) => {

        queryParams("SELECT * FROM public.credentials WHERE (email = $1 AND code = $2);", [email, code], (err, res) => {
            if(res.rows[0] == null){
                return ({status: '500', error: 'Wrong email or code.'});

            }
        }, client);

        queryParams("UPDATE public.credentials SET verified = $1 WHERE email = $2 RETURNING email;", [true, email], (err, res) => {
            if(res.rows[0] == null){
                return ({status: '500', error: 'It was not possible to update the status.'});
            }
        }, client);
    });

    return ({status: '200', message: 'Account successfully verified.'});
}