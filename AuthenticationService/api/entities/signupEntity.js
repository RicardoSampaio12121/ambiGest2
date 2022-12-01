const bcrypt = require('bcryptjs');

exports.signupEntity = class signupEntity {
    constructor(email, password, name, surname, birthdate, code) {
        console.log("No constructor: " + password);
        
        this.email = email
        this.password = this.isPasswordValid(password) ? password : "ola"
        this.name = name
        this.surname = surname
        this.birthdate = birthdate
        this.role = "",
        this.code = code
    }

    isPasswordValid(password) {
        console.log("No validator: " + password)

        if (password.length >= 8) {
            console.log("Vai retornar true")
            return true;
        }
        console.log("Vai retornar false")
        return false;
    }
}