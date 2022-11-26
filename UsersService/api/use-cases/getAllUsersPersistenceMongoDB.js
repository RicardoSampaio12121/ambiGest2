const User = require('../framework/db/mongoDB/userModel')

exports.getAllUsersPersistence = async () => {
    const users = await User.find({}).catch(function(err) {
        if(err) return {status: '500', error: 'There was an error trying to get all the users from the database.'}
    });

    return {status: '200', message: users}
}