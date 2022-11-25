const router = require('express').Router()

const credentialsIterator = require("../../use-cases/credentialsInteractorMongoDB");
const checkCredentialsPersistence = require("../../use-cases/checkCredentialsMongoDB");
const addCredentialsPersistence = require("../../use-cases/addCredentialsPersistencePSQL");
const updatePasswordPersistence = require("../../use-cases/updatePasswordPersistencePSQL");

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

router.route('/deleteCredentials')
    .delete(async (req, res) => {
        const {email} = req.body;
    })




// router.route('/updatePassword').put(credentialsController.updatePassword)
// router.route('/deleteUserRecords').delete(credentialsController.deleteUserRecords)
// router.route('/addUserCredentials').post(credentialsController.addCredentials)

module.exports=router