const router = require('express').Router()

const credentialsIterator = require("../../use-cases/credentialsInteractorMongoDB");
const checkCredentialsPersistence = require("../../use-cases/checkCredentialsMongoDB")

router.route('/checkCreds')
    .post(async (req, res) => {
        const {email, password} = req.body;
        try{
            
            const creds = await credentialsIterator.checkCredentialsInteractor({checkCredentialsPersistence}, {email, password})
            res.json(creds);
        }catch(error){
            throw error;
            //return res.status(500).send('Internal server error');
        }
    })




// router.route('/updatePassword').put(credentialsController.updatePassword)
// router.route('/deleteUserRecords').delete(credentialsController.deleteUserRecords)
// router.route('/addUserCredentials').post(credentialsController.addCredentials)

module.exports=router