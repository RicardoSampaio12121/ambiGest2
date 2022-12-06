"use strict"

const { UserEntity } = require("../entities/UserEntity");
const { jwt } = require('jsonwebtoken');

require("../entities/UserEntity")

exports.createUserIterator = async ({ createUserPersistence }, { name, surname, email, birthdate, code }) => {
    try {

        console.log("Dentro do try: " + code)

        const newUser = new UserEntity(name, surname, email, birthdate, "", code);

        console.log(newUser.code)

        if (name == "") return ({ status: '500', message: 'Provide a valid name' });
        if (surname == "") return ({ status: '500', message: 'Provide a valid surname' });
        if (email == "") return ({ status: '500', message: 'Provide a valid email' });
        if (birthdate == "") return ({ status: '500', message: 'Provide a valid birthdate' });

        var output = await createUserPersistence(newUser);
        
        return output;
    } catch (error) {
        throw error;
    }
}

exports.updateUserIterator = async ({ updateUserPersistence }, { name, surname, email, birthdate }) => {
    try {
        //TODO: Fazer aqui algum tipo de updateUserEntity

        var output = await updateUserPersistence(email, name, surname, birthdate);
        return output;

    } catch (error) {
        throw error;
    }
}

exports.updateEmailIterator = async ({ updateEmailPersistence }, { currentEmail, newEmail }) => {
    try {
        var output = await updateEmailIterator(currentEmail, newEmail);
        return output;
    } catch (error) {
        throw error;
    }
}

exports.deleteUserIterator = async ({ deleteUserPersistence }, { email }) => {
    try {
        //TODO: Check if email is valid or not
        var output = await deleteUserPersistence(email);
        return output;
    } catch (error) {
        throw error;
    }
}

exports.getAllUsersIterator = async ({ getAllUsersPersistence }) => {
    try {
        var output = await getAllUsersPersistence();

        return output;
    } catch (error) {
        throw error;
    }
}

exports.getSingleUserIterator = async ({ getSingleUserPersistence }, { email, token }) => {
    try {
        var output = await getSingleUserPersistence(email);
        return output;
    } catch (error) {
        throw error;
    }
}