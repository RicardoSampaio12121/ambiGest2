exports.UserEntity = class UserEntity {
    constructor(name, surname, email, birthdate, role, code) {
        this.name = name
        this.surname = surname
        this.email = this.isValidEmail(email) ? email : ""
        this.birthdate = birthdate
        this.role = role
        this.code = code
    }

    //TODO: Fazer as verificações
    isValidEmail(email){
        return true;
    }
}
