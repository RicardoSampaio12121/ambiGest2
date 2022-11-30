exports.CredsLogin = class CredsLogin {
    constructor(email, password) {
        this.email = this.isValidEmail(email) ? email : ""
        this.password = this.isValidPassword(password) ? password : ""
    }

    //TODO: Fazer as verificações
    isValidEmail(email){
        return true;
    }

    isValidPassword(password) {
        return true;
    }

}
