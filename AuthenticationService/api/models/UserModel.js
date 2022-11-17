class UserModel {
    constructor(username, email, password, birthDate) {
        this.username = this.isValidUsername(username) ? username : "" 
        this.email = this.isValidEmail(email) ? email : ""
        this.password = this.isValidPassword(password) ? password : ""
        this.birthDate = this.isValidBirthDate(birthDate) ? birthDate : ""
    }

    //TODO: Fazer as verificações
    isValidUsername(username){
        return true;
    }

    isValidEmail(email){
        return true;
    }

    isValidPassword(password) {
        return true;
    }

    isValidBirthDate(birthDate) {
        return true;
    }
}