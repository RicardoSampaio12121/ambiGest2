const EmailClient = require('../external/emailSender')
const bcrypt = require('bcryptjs')
//const Constant = require('../Constants')
const Dtos = require('../DTOs/LoginDto')
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.login = async(req, res) => {
    const {email, password } = req.body

    const passwordEncrypt = await bcrypt.hash(password, 15)

    try{
        //var loginDto = new LoginDto(email, password)

        //TODO: Enviar para o MQTT para o tópico das credenciais para verificar as credenciais do utilizador

        //Ao fazer login tem que retornar o ID do utilizador para o JWT

        const id = 32 //Este id deve ser o que vem do MQTT da base de dados

        //Se responder positivo, retornar JWT Token, se não, retornar um erro

        const token = jwt.sign({ id }, process.env.JWTSECRET, {expiresIn: 300});

        return res.json({token: token})
    }
    catch(error)
    {
        return res.json({status: 'error', error: "Não foi possível fazer o login", message: error.message})
    }
}

exports.logout = async(req, res) => {
    // Não sei o que é para fazer aqui ao certo, acho que da parte do servidor não há grande utilizade
    // Se fosse da parte do cliente talvez remover o JWT do armazenamento do browser, mas aqui não sei o que fazer
}

exports.signup = async(req, res) => {
    const {username, password, email, birthDate } = req.body

    //TODO: Fazer as verificações todas

    //Encriptar password
    const passwordEncrypt = await bcrypt.hash(password, 15)
    
    // Gerar código random
    let code = (Math.random() + 1).toString(36).substring(7);

    try{

        var model = new UserModel(username, email, password, birthDate)

        //TODO: Enviar para o MQTT para o tópico das credenciais para guardar as credenciais do utilizador
        //TODO: Enviar para o MQTT para o tópico dos users para adicionar à base de dados dos utilizadores
        
        var emailClient = new EmailClient.EmailClient(email, code)
        emailClient.sendVerificationEmail();

        //TODO: Enviar para o MQTT e retornar a resposta

        //TODELETE
        res.json({status: 'success'})

    }catch(error)
    {
        return res.json({status: 'error', error: 'Não foi possível fazer o registo na plataforma.'})
    }
}

exports.refresh_token = async(req, res) => {
    verifyJWT(req, res)

    const token = jwt.sign({id: req.userId}, process.env.JWTSECRET, {expiresIn: 300});

    return res.json({token: token});
}

exports.recover = async(req, res) => {
    
}

function verifyJWT(req, res){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.JWTSECRET, function(err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
    });
}