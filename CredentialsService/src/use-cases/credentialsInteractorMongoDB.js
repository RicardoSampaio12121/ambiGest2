"use strict";

const { CredentialsEntity } = require("../entities/CredentialsEntity");

exports.checkCredentialsInteractor = async ({ checkCredentialsPersistence }, { email, password }) => {
    try {

        console.log("Email:: " + email)
        console.log("Password:: " + password)

        const creds = new CredentialsEntity(email, password, false);
        const output = await checkCredentialsPersistence(email, password);

        console.log("CREDENTIALS: " + creds);
        console.log("Output: " + output.data);

        return output;

    } catch (error) {
        console.log(error);
        throw error;
    }
};

exports.addCredentialsIterator = async ({ addCredentialsPersistence }, { email, password, code }) => {
    try {
        const output = await addCredentialsPersistence(email, password, code);
        return output;
    }
    catch (error) {
        throw error;
    }
}

exports.updatePassword = async ({ updatePasswordPersistence }, { email, newPassword }) => {
    try {
        const output = await updatePasswordPersistence(email, newPassword);
        return output;
    } catch (error) {
        throw error;
    }
}

exports.updateVerifyAccount = async ( updateVerifyAccountPersistence , { email, code }) => {
    try {
        const output = await updateVerifyAccountPersistence(email, code);
        return output;
    } catch (error) {
        throw error;
    }
}

exports.deleteCredentials = async ({ deleteCredentialsPersistence }, { email }) => {
    try {
        const output = await deleteCredentialsPersistence(email);
        return output;
    } catch (error) {
        throw error;
    }
}
