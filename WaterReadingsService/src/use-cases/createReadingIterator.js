const Readings = require('../framework/db/mongoDB/readingModel')

exports.createReadingPersistence = async (reading) => {
    const userReading = await Readings.find({ email: reading.email })
        .sort({ _id: 1 })
        .limit(1)


    console.log("Antes do newReading")
    const newReading = new Readings({
        email: reading.email,
        data: Date.now(),
        amount: reading.amount
    });

    if (userReading && userReading.amount <= newReading.amount || userReading.email == null) {
        newReading.save();
        return { status: '200', message: 'User created successfully.' };
    }
    console.log("Depois do if")

    return { status: '500', message: 'Reading could not be sent' };

}