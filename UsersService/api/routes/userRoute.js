const router = require('express').Router()
const { Router, application } = require('express');
var usersController = require('../controllers/userController');

router.route('/getUser').get(usersController.read)
router.route('/newUser').put(usersController.update)
router.route('/delete').delete(usersController.delete)


module.exports=router