class LoginDto {
    constructor(email, password) {
        this.email = this.isEmailValid ? email : ""
        this.password = this.isPasswordValid ? password : ""
    }

    isEmailValid(email){
        return true
    }

    isPasswordValid(password) {
        return true
    }
}