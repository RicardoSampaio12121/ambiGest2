"use strict";

const {CredentialsEntity} = require("../entities/CredentialsEntity");


exports.checkCredentialsInteractor = async({checkCredentialsPersistence}, {email, password}) => {
    try{

        const creds = new CredentialsEntity({
            email, password
        });

        const output = await checkCredentialsPersistence(checker);
        return output;

    }catch(error){
        console.log(error);
        throw error;
    }
}