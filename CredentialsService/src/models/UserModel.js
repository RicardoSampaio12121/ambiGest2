class UserModel {
    constructor(email, password, verified) {
        this.email = this.isValidEmail(email) ? email : ""
        this.password = this.isValidPassword(password) ? password : ""
        this.verifies = verified
    }

    //TODO: Fazer as verificações
    isValidEmail(email){
        return true;
    }

    isValidPassword(password) {
        return true;
    }

}