const router = require('express').Router()
const { Router } = require('express')

var authenticationController = require('../controllers/authenticationController')

router.route('/login').post(authenticationController.login)
router.route('/logout').post(authenticationController.logout)
router.route('/signup').post(authenticationController.signup)
router.route('/refresh_token').get(authenticationController.refresh_token)
router.route('/recover').post(authenticationController.recover)