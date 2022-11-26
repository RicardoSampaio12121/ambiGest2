const User = require('../framework/db/mongoDB/userModel')

exports.getSingleUserPersistence = async (email) => {
    var userFind = await User.findOne({ email: email })
        .catch(function (err) {
            if (err) return { status: '500', error: 'There was an error trying to get the user.' }
        })
    if (!userFind) return { status: '500', error: 'There is no user registered with the given email.' }

    return { status: '200', message: userFind }
}