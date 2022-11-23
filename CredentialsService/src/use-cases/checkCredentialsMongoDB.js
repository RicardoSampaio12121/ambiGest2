const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET


const { getClient, query, queryParams } = require("../framework/db/Postgresql/client")

console.log("Antes de entrar na função checkCredentialsPersistence");

exports.checkCredentialsPersistence = async(email, password) =>{
    const emailll = email
    const passworddd = password
    // getClient((errClient, client) => {
    //     queryParams('INSERT INTO pulic.users (email, password, verifies) VALUES ($1, $2, $3);', [email, password, false], (err) => {
    //         client.end();
    //     }, client);
    // });

    console.log(JWT_SECRET)

    try{
        const token = jwt.sign({
            id: 223,
            email: emailll
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