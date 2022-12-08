const {configDB} = require("../framework/db/Postgresql/config")
const { Client } = require('pg')
const client = new Client(configDB)
client.connect()

exports.getAllCredentialsPersistence = async() => {
    const credentials = await client.query("SELECT * FROM public.credentials;")
    return {status: '200', message: credentials}
}
