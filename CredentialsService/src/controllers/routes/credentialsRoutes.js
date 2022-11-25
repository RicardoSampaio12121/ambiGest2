const router = require('express').Router()

const credentialsIterator = require("../../use-cases/credentialsInteractorMongoDB");
const checkCredentialsPersistence = require("../../use-cases/checkCredentialsMongoDB");
const addCredentialsPersistence = require("../../use-cases/addCredentialsPersistencePSQL");
const updatePasswordPersistence = require("../../use-cases/updatePasswordPersistencePSQL");
const deleteCredentialsPersistence = require("../../use-cases/deleteCredentialsPersistencePSQL");
const updateVerifyAccountPersistence = require("../../use-cases/updateVerifyAccountPersistencePSQL");

router.route('/checkCreds')
    .post(async (req, res) => {
        const {email, password} = req.body;
        try{
            const creds = await credentialsIterator.checkCredentialsInteractor(checkCredentialsPersistence, {email, password})
            res.json(creds);
        }catch(error){
            throw error;
            //return res.status(500).send('Internal server error');
        }
    })

router.route('/addCredentials')
    .post(async (req, res) => {
        const {email, password} = req.body;
        try{
            const creds = await credentialsIterator.addCredentialsIterator(addCredentialsPersistence, {email, password})

            console.log(creds);

            return res.json(creds);
        }catch(error){
            throw error;
        }
    })

//TODO: Verificar token
router.route('/updatePassword')
    .put(async (req, res) => {
        const {email, newPassword} = req.body;

        try{
            await credentialsIterator.updatePassword(updatePasswordPersistence, {email, newPassword})

            var toReturn = ({status: '200'})
            return res.json(toReturn);
        }catch(error){
            throw error;
        }
    })

//TODO: Verificar o token
router.route('/deleteCredentials')
    .delete(async (req, res) => {
        const {email} = req.body;

        try{
            var response = await credentialsIterator.deleteCredentials( deleteCredentialsPersistence, {email} )
            return res.json(response);
        }catch(error){
            throw error;
        }
    })

//TODO: Verificar o token
router.route('/updateVerifyAccount')
    .put(async (req, res) => {
        const { email, code } = req.body;

        try{
            var response = await credentialsIterator.updateVerifyAccount( updateVerifyAccountPersistence, {email, code} )
            return res.json(response);
        }catch(error){
            throw error;
        }
    })

module.exports=router