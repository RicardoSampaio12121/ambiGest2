const jwt = require('jsonwebtoken');
const client = require('../framework/db/Postgresql/client');
const bcrypt = require('bcryptjs')

const JWT_SECRET = process.env.JWT_SECRET


const { getClient, query, queryParams } = require("../framework/db/Postgresql/client")

exports.checkCredentialsPersistence = async (email, password) => {

    getClient((errClient, client) => {

        console.log("Email: " + email);
        console.log("Email: " + password);

        queryParams('SELECT * FROM public.credentials WHERE email = $1;', [email], (err, res) => {
            //Resolver problema aqui, provavelmente tem que ser assincrono e esperar sei lá

            if(!res){

            }

            if (err) {
                console.log("Entra no if")
                console.log(err)
                return { status: '500', error: 'No user with those credentials.' }
            }
            else if (res.rows[0].verified == false) {
                console.log("Entra no else")
                return { status: '500', error: 'User not verified' }
            }
            else if(bcrypt.compareSync(password, res.rows[0].password)){
                return {status: '500', error: 'Wrong password'}
            }
            else {
                try {
                    const token = jwt.sign({
                        email: email
                    },
                        JWT_SECRET,
                        {
                            expiresIn: 86400
                        }
                    )
                    client.end();

                    console.log(token)
                    return { status: '200', data: token }

                } catch (error) {
                    return { status: '500', error: error }
                }
            }
        }, client);
    });


}