const { ReadingEntity } = require('../entities/ReadingEntity')

exports.createReadingIterator = async (createReadingIteratorPersistence, {email, amount }) => {
    try{
        const newReading = new ReadingEntity(email, amount);

        var output = await createReadingIteratorPersistence(newReading);
        console.log("Antes do output")
        return output;

    }catch(error) {
        throw error;
    }
};

exports.getReadingsIterator = async (getReadingsPersistence, {email}) => {
    try{
        var output = await getReadingsPersistence(email);
        return output;
    }catch(error){
        throw error;
    }
}

exports.getAllReadingsIterator = async (getAllReadingsPersistence) => {
    
    try{
        var output = await getAllReadingsPersistence()
        return output;

    }catch(error){
        throw error;
    }
}