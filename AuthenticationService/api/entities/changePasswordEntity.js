exports.changePasswordEntity = class changePasswordEntity {
    constructor(email, password){
        this.email = this.isEmailValid(email) ? email : ""
        this.newPassword = this.isPasswordValid(password) ? password : ""
    }

    isEmailValid(email){
        return true;
    }

    isPasswordValid(password){
        return true;
    }
}