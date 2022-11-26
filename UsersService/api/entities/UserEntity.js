exports.UserEntity = class UserEntity {
    constructor(name, surname, email, birthdate, role) {
        this.name = this.isNameValid(name) ? name : ""
        this.surname = this.isSurnameValid(surname) ? surname : ""
        this.email = this.isValidEmail(email) ? email : ""
        this.birthdate = this.isValidBirthdate(birthdate) ? birthdate : ""
        this.role = this.isValidRole(role) ? role : ""
    }

    //TODO: Fazer as verificações
    isNameValid(name){
        return true;
    }

    isSurnameValid(surname){
        return true;
    }
    
    isValidEmail(email){
        return true;
    }

    isValidBirthdate(birthdate) {
        return true;
    }

    isValidRole(role){
        return true;
    }
}
