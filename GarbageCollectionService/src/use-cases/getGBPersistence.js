const GB = require('../framework/DB/Mongo/GBModel')

exports.getGBPersistence = async (email) => {
    var output = await GB.find({email: email});
    return {status: '200', message: output}
}