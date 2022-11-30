exports.userInfo = class userInfo {
    constructor(email, name, surname, birthdate){
        this.email = this.isEmailValid(email) ? email : ""
        this.name = name
        this.surname = surname
        this.birthdate = birthdate
        this.role = ""
    }

    isEmailValid(email){
        return true;
    }
}