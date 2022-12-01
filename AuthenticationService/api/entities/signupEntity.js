const bcrypt = require('bcryptjs');

exports.signupEntity = class signupEntity {
    constructor(email, password, name, surname, birthdate){
        this.email = this.isEmailValid(email) ? email : ""
        this.password = this.isPasswordValid(password) ? password : ""
        this.name = name
        this.surname = surname 
        this.birthdate = birthdate
        this.role = ""
    }

    isEmailValid(email){
        return /\S+@\S+\.\S+/.test(email)
    }

    isPasswordValid(password){
        if(password.length >= 8) return true;
        return false;
    }
}