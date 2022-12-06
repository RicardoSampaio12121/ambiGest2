const {configDB} = require("../framework/db/Postgresql/config")
const { CredentialsEntity } = require("../entities/CredentialsEntity")
const { Client } = require('pg')
const client = new Client(configDB)
client.connect()


exports.addCredentialsPersistence = async (email, password, code) => {
    const check = await client.query('SELECT * FROM public.credentials WHERE email = $1;', [email]);
    if(check.rowCount != 0) return {status: '500', message: 'This email is already in use.'};

    await client.query('INSERT INTO public.credentials (email, password, verified, code, role) VALUES ($1, $2, $3, $4, $5);', [email, password, false, code, 'user']);
    return {status: '200', message: 'Inserted successfully.'};
}