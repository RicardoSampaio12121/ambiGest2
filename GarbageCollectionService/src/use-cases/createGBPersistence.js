const GB = require('../framework/DB/Mongo/GBModel')

exports.createGBPersistence = async (entity) => {
    const newGb = new GB({
        email: entity.email,
        type: entity.type,
        date: entity.date
    });

    newGb.save();
    return {status: '200', message: 'Garbage collection created successfully'}

}