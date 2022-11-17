class EmailClient {
    constructor(email, verificationCode){
        this.email = email;
        this.verificationCode = verificationCode
        this.nodeMailer = require('nodemailer')

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'ambigestIPCA@gmail.pt',
                pass: 'thethreedeadlyhallows9'
            }
        });

        
    }

    sendVerificationEmail(){

        var mailOptions = {
            from: 'ambigestIPCA@gmail.pt',
            to: 'ricardo_cs@outlook.pt',
            subject: 'Your authorization code!',
            text: 'Your code is!' + this.verificationCode
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
  
  
  
  