'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gbSchema = new Schema({
    email: {type: String, require: true},
    type: {type: String, require: true},
    date: {type: Date, require: true}
},
{collection: 'garbageCol'}
)

// const Garbage = mongoose.model('Garbage', gbSchema)
// module.exports=Garbage;
module.exports =
    mongoose.models.Garbage || mongoose.model('Garbage', gbSchema);