exports.credentialsEntity = class credentialsEntity {
    constructor(email, password){
        this.email = this.isEmailValid(email) ? email : ""
        this.password = this.isPasswordValid(password) ? password : ""
    }

    isEmailValid(email){
        return true;
    }

    isPasswordValid(password){
        return true;
    }
}