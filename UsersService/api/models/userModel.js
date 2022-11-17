'user strict';
//esquema da DB
const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        username:{type:String, require:true, unique:true},
        password:{type:String, require:true},
        email:{type:String,require:true}, 
        birthDate:{type:Date, require:true},
        verified:{type:Boolean, require:true}
    },
    {collection:'users'}
)

const User = mongoose.model('User',UserSchema)

module.exports=User