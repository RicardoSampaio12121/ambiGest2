const { gbEntity } = require('../Entities/GBEntity');

require('../Entities/GBEntity')

exports.createGBIterator = async ( createGBPersistence , { email, type, date }) => {
    try {
        const newGB = new gbEntity(email, type, date)
        var output = await createGBPersistence(newGB);
        return output;
    } catch (error) {
        throw error;
    }
}

exports.getGBIterator = async ( getGBPersistence , { email }) => {
    try {
        var output = await getGBPersistence(email);
        return output;
    } catch (error) {
        throw error;
    }
}

exports.getAllGBIterator = async ( getAllGBPersistence ) => {
    try{
        var output = await getAllGBPersistence();
        return output;
    }catch(error){
        throw error;
    }
}