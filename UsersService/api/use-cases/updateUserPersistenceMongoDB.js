const User = require('../framework/db/mongoDB/userModel')


exports.updateUserPersistence = async (email, name, surname, birthdate) => {
    const userFind = await User.findOne({email: email});
    
    if(!userFind) return {status: '500', error: 'User not found.'};

    //TODO: Talvez cada parâmetro ser opcional
    //TODO: Pensar numa maneira de mudar o email, pois talvez seja preciso enviar email para confirmar o código
    //      Talvez fazer isso num endpoint à parte...
    userFind.name = name;
    userFind.surname = surname;
    userFind.birthdate = birthdate;

    await userFind.save(function(err){
        if(err) return {status: '500', error: 'It was not possible to change the user information.'};
    });

    return {status: '200', message: 'User information changed successfully.'};
}