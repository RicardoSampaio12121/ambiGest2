const router = require('express').Router()

var credentialsController = require('../controllers/credentialsController')

router.route('/checkCreds').post(credentialsController.checkCredentials)
router.route('/updatePassword').put(credentialsController.updatePassword)
router.route('/deleteUserRecords').delete(credentialsController.deleteUserRecords)
router.route('/addUserCredentials').post(credentialsController.addCredentials)

module.exports=router