const { json } = require('express');
const { UserEntity } = require('../entities/UserEntity');
const User = require('../framework/db/mongoDB/userModel');
const { deleteUserCredsMqtt } = require('./deleteUserCredsMqtt');

exports.deleteUserPersistence = async (email) => {

    var userFind = await User.findOne({ email: email });
    if (!userFind) return { status: '500', error: 'User doesnt exists' };

    await userFind.delete()
        .catch(function (error) {
            return { status: '500', error: error };
        });

    deleteUserCredsMqtt(email);

    return { status: '200', message: 'User deleted successfully' };

}