const User = require('../framework/db/mongoDB/userModel')

exports.updateEmailPersistence = async (currentEmail, newEmail) => {
    const userFind = await User.findOne({ email: currentEmail })
        .catch(function (err) {
            if (err) return { status: '500', error: 'There was an error trying to find the user.' }
        })

    if (!userFind) return { status: '500', error: 'There is no user assossiated with the given email.' }

    userFind.email = newEmail;

    await userFind.save().catch(function (err) {
        return { status: '500', error: 'There was an error trying to update the email.' }
    });

    return { status: '200', message: 'User updated successfully' }
}