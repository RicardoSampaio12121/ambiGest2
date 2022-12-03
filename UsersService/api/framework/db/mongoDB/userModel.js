'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    email: { type: String, require: true },
    name: { type: String, require: true },
    surname: { type: String, require: true },
    birthdate: { type: Date, require: true },
    role: { type: String, require: true },
    code: { type: String, require: true }
},
    { collection: 'users' }
)

const User = mongoose.model('User', UserSchema);

module.exports=User