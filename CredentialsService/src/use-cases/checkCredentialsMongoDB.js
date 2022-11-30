const jwt = require('jsonwebtoken');
const client = require('../framework/db/Postgresql/client');

const JWT_SECRET = process.env.JWT_SECRET


const { getClient, query, queryParams } = require("../framework/db/Postgresql/client")

exports.checkCredentialsPersistence = async (email, password) => {
    const emailll = email
    const passworddd = password

    getClient((errClient, client) => {
        queryParams('SELECT * FROM public.users WHERE email = $1 AND password = $2;', [email, password], (err, res) => {
            //Resolver problema aqui, provavelmente tem que ser assincrono e esperar sei lá
            //if (res.rows[0].verified == false) return { status: '500', error: 'User not verified' }

            if (err) return { status: '500', error: 'No user with those credentials.' }

            client.end();
        }, client);
    });

    try {
        const token = jwt.sign({
            email: emailll
        },
            JWT_SECRET,
            {
                expiresIn: 86400
            }
        )

        return { status: '200', data: token }

    } catch (error) {
        return { status: '500', error: error }
    }
}