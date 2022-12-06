const Readings = require('../framework/db/mongoDB/readingModel')

exports.getAllReadingsPersistence = async() => {
    const readings = await Readings.find();
    console.log("Readings: " + readings)
    return {status: '200', message: readings}
}