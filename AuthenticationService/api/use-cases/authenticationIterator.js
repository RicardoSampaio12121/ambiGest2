const bcrypt = require('bcryptjs')
const { changePasswordEntity } = require('../entities/changePasswordEntity');
const { loginEntity } = require('../entities/loginEntity');
const { signupEntity } = require('../entities/signupEntity');

require('../entities/loginEntity')
require('../entities/changePasswordEntity')

exports.loginIterator = async ({ loginMqtt }, { email, password }) => {
    try {
        //Encrypt password first

        const login = new loginEntity(email, password);
        var output = await loginMqtt(login);

        console.log("OUTPUT: " + output)
        return output;
    } catch (error) {
        throw error;
    }
}

exports.signupIterator = async ({ signupMqtt }, { email, password, name, surname, birthdate }) => {
    try {

        const hashed = await bcrypt.hash(password, 15);
        const signup = new signupEntity(email, hashed, name, surname, birthdate)

        if(email == "") return {status: '500', error: 'Invalid email address.'}
        if(password = "") return {status: '500', error: 'Invalid password'}

        var output = await signupMqtt(signup);
        return output;
    } catch (error) {
        throw error;
    }
}

exports.changePassword = async ({ changePasswordMqtt }, { email, newPassword }) => {
    try {
        const changePass = new changePasswordEntity(email, newPassword)
        var output = await changePasswordMqtt(changePass);
        return output;
    } catch (error) {
        throw error;
    }
}