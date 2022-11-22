'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const CredentialsSchema = new Schema(
    {
        email: {type:String, require:true,
        password:{type:String, require:true}}
    },
    {collection: 'credentials'}
)

const Credentials = mongoose.model('Creds', CredentialsSchema)

module.exports=Credentials