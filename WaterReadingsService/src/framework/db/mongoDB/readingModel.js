'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const readingsSchema = new Schema({
    email: { type: String, require: true },
    data: {type: Date, require: true},
    amount: {type: Number, require: true}
},
{ collection: 'readings' }
)

const Reading = mongoose.model('Reading', readingsSchema)
module.exports=Reading;