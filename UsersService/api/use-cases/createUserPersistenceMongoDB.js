const mongoose = require('mongoose');
const User = require('../framework/db/mongoDB/userModel')
require("../framework/db/mongoDB/userModel")

exports.createUserPersistence = async (user) => {
    const userFind = await User.findOne({ email: user.email }).lean();

    if (userFind) {
        return { status: '500', error: 'User already exists' };
    }

    const newUser = new User({
        email: user.email,
        name: user.name,
        surname: user.surname,
        birthdate: user.birthdate,
        role: user.role
    });

    await newUser.save();
        
    return {status: '200', message: 'User created successfully'};

}