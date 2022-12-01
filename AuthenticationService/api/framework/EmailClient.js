require('dotenv').config();

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  }
});

class EmailClient {
    
  constructor(email, code){
    this.email = email 
    this.code = code
    }

    //TODO: Fazer com que isto seja assincrono
    sendVerificationEmail(){
        var mailOptions = {
            from: 'ambigest@outlook.com', //.env variable
            to: this.email,
            subject: 'Your authorization code!',
            text: 'Your code is: ' + this.code
          };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          }); 
    }
}

module.exports = {EmailClient}
  
  