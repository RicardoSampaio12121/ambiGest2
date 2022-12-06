const Readings = require('../framework/db/mongoDB/readingModel')

exports.getReadingsPersistence = async(email) => {

    console.log("Email: " + email)

    const readings = await Readings.find({email: email})
    return {status: '200', message: readings}

}