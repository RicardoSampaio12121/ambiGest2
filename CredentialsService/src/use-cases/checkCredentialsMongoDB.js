const { configDB } = require("../framework/db/Postgresql/config")
const jwt = require('jsonwebtoken');
const { Client } = require('pg')
const client = new Client(configDB)
client.connect()
const bcrypt = require('bcryptjs')
const JWT_SECRET = process.env.JWT_SECRET

exports.checkCredentialsPersistence = async (email, password) => {

    const res = await client.query('SELECT * FROM public.credentials WHERE email = $1;', [email])

    console.log(res.rows[0].email)
    console.log(res.rows[0].verified)

    if (res.rows[0].verified == false) {
        return { status: '500', error: 'User not verified' }
    }
    else {
        const comparison = bcrypt.compareSync(password, res.rows[0].password);
        if (comparison) {
            try {
                const token = jwt.sign({
                    "UserInfo" : {
                        "email": email,
                        "role": res.rows[0].role
                    }
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
    }
}