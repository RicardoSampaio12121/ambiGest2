var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
      user: "ricardo_cs@outlook.pt",
      pass: "jesusofsuburbiaGD1"
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
            from: 'ricardo_cs@outlook.pt',
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



// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'youremail@gmail.com',
//       pass: 'yourpassword'
//     }
//   });
  
  
  
  