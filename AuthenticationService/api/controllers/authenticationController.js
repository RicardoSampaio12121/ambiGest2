const EmailClient = require('../external/emailSender')
const bcrypt = require('bcryptjs')

exports.login = async(req, res) => {

}

exports.logout = async(req, res) => {

}

exports.signup = async(req, res) => {
    const {username, password, email, birthDate } = req.body

    //TODO: Fazer as verificações todas

    const passwordEncrypt = await bcrypt.hash(password, 15)


    try{
        //TODO: Enviar para o MQTT o utilizador para o serviço de credenciais criar o registo na BD
        

        var emailClient = new EmailClient.EmailClient("nfds", 286228)
        emailClient.sendVerificationEmail();
    
        //Se a resposta do MQTT for positiva, retornar sucesso aqui
    
    }catch(error)
    {
        return res.json({status: 'error', error:'Não sei'})
    }

   
}

exports.refresh_token = async(req, res) => {

}

exports.recover = async(req, res) => {
    
}