exports.gbEntity = class gbEntity {
    constructor(email, type, date) {
        this.email = this.isEmailValid(email) ? email : "ola"
        this.type = type
        this.date = date
    }

    isEmailValid(email) {
        return true;
    }
}