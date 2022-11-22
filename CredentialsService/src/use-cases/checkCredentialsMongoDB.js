const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const CredentialsDB = mongoose.model('Creds');

const JWT_SECRET=process.env.JWT_SECRET; 

exports.checkCredentialsPersistence = async(creds) =>{
    const {email, password} = creds

    const storedCreds = await CredentialsDB.findOne({email}).lean()
    if(!storedCreds) return ({status: '500', error: 'User not found'})

    if(storedCreds.password == password){
        try{

            const token = jwt.sign({
                id: storedCreds._id,
                email: storedCreds.email
            },
                JWT_SECRET,
                {
                    expiresIn: 86400
                }
            )

            return({status:'200', data: token})

        }catch(error){
            console.log(error)
            return ({status: '500', error: error})
        }
    }

}