exports.UserEntity = class UserEntity {
    constructor(name, surname, email, birthdate, role) {
        this.name = name
        this.surname = surname
        this.email = this.isValidEmail(email) ? email : ""
        this.birthdate = birthdate
        this.role = ""
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
