"use strict";

const {CredentialsEntity} = require("../entities/CredentialsEntity");

exports.checkCredentialsInteractor = async({ checkCredentialsPersistence }, {email, password}) => {
    try{
        const creds = new CredentialsEntity({
            email, password
        });
        const output = await checkCredentialsPersistence(email, password);
        
        return output;

    }catch(error){
        console.log(error);
        throw error;
    }
};

exports.addCredentialsIterator = async({ addCredentialsPersistence }, {email, password}) => {
    try{
        const output = await addCredentialsPersistence(email, password);
        console.log("Aquiiii: " + output)

        return output;
    }
    catch(error){
        throw error;
    }
}