const GB = require('../framework/DB/Mongo/GBModel')

exports.getAllGPersistence = async () => {
    var output = await GB.find();
    return {status: '200', message: output}
}