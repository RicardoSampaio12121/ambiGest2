const bcrypt = require('bcryptjs')
const { changePasswordEntity } = require('../entities/changePasswordEntity');
const { loginEntity } = require('../entities/loginEntity');
const { signupEntity } = require('../entities/signupEntity');
const { EmailClient } = require('../framework/EmailClient');
const { verifyAccountEntity } = require('../entities/verifyAccountEntity');

require('../entities/loginEntity')
require('../entities/changePasswordEntity')
require('../entities/verifyAccountEntity')

exports.loginIterator = async ({ loginMqtt }, { email, password }) => {
    try {
        //Encrypt password first
        console.log("Password: " + password)


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
        const code = (Math.random() + 1).toString(36).substring(7);


        const signup = new signupEntity(email, hashed, name, surname, birthdate, code)

        if (signup.email == "") {
            return { status: '500', error: 'Invalid email address.' }
        }
        if (signup.password == "") return { status: '500', error: 'Invalid password' }

        var output = await signupMqtt(signup);

        const emailClient = new EmailClient(signup.email, code);
        emailClient.sendVerificationEmail();

        return output;
    } catch (error) {
        throw error;
    }
}

exports.changePassword = async ({ changePasswordMqtt }, { email, newPassword }) => {
    try {
        const hashed = await bcrypt.hash(newPassword, 15);
        const changePass = new changePasswordEntity(email, hashed)
        var output = await changePasswordMqtt(changePass);
        return output;
    } catch (error) {
        throw error;
    }
}

exports.updateAccount = async ( verifyAccountMqtt , { email, code }) => {
    try {
        const updateAccount = new verifyAccountEntity(email, code);
        var output = await verifyAccountMqtt(updateAccount);
        return output;
    } catch (error) {
        throw error;
    }
}