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
        return output;
    }
    catch(error){
        throw error;
    }
}

exports.updatePassword = async ({ updatePasswordPersistence }, {email, newPassword }) => {
    try{
        const output = await updatePasswordPersistence(email, newPassword);
        return output;
    }catch(error){
        throw error;
    }
}

exports.updateVerifyAccount = async ({ updateVerifyAccountPersistence }, {email, code}) => {
    try{
        const output = await updateVerifyAccountPersistence(email, code);
        return output;
    }catch(error){
        throw error;
    }
}