exports.ReadingEntity = class ReadingEntity {
    constructor(email, amount) {
        this.email = this.isValidEmail(email) ? email : ""
        this.amount = amount
    }

    //TODO: Fazer as verificações
    isValidEmail(email){
        return true;
    }
}
