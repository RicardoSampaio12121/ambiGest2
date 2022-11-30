exports.signupEntity = class signupEntity {
    constructor(email, password, name, surname, birthdate){
        this.email = this.isEmailValid(email) ? email : ""
        this.password = this.isPasswordValid(password) ? password : ""
        this.name = name
        this.surname = surname
        this.birthdate = birthdate
    }

    isEmailValid(email){
        return true;
    }

    isPasswordValid(password){
        return true;
    }
}