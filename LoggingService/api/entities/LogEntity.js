exports.LogEntity = class LogEntity {
  constructor(type, date, time, message) {
    this.type = type ? type : "null";
    this.date = date ? date : "";
    this.time = time ? time : "";
    this.message = message ? message : "";
    //console.log("here" + this.type, this.date, this.time, this.message);

    /*this.message = this.isNameValid(name) ? name : ""
        this.surname = this.isSurnameValid(surname) ? surname : ""
        this.email = this.isValidEmail(email) ? email : ""
        this.birthdate = this.isValidBirthdate(birthdate) ? birthdate : ""
        this.role = this.isValidRole(role) ? role : ""*/
  }

  //TODO: Fazer as verificações
  /*isNameValid(name){
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
    }*/
};
