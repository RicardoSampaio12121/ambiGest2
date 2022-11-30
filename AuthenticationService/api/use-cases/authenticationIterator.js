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
        const signup = new signupEntity(email, password, name, surname, birthdate)
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