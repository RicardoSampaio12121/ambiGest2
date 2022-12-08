const router = require('express').Router()
const jwt = require('jsonwebtoken');
const authenticationIterator = require("../../use-cases/authenticationIterator");
const loginMqtt = require("../../use-cases/loginMqtt");
const signupMqtt = require("../../use-cases/signupMqtt");
const changePasswordMqtt = require("../../use-cases/changePasswordMqtt")
const verifyAccount = require("../../use-cases/verifyAccountMqtt")

router.route('/login')
    .post(async (req, res) => {
        const { email, password } = req.body;

        try {
            const output = await authenticationIterator.loginIterator(loginMqtt, { email, password })
            res.json(output);
        } catch (error) {
            throw error;
        }
    })

router.route('/signup')
    .post(async (req, res) => {
        const { email, password, name, surname, birthdate } = req.body

        try {
            const output = await authenticationIterator.signupIterator(signupMqtt, { email, password, name, surname, birthdate })
            res.json(output);
        } catch (error) {
            throw error;
        }
    })

router.route('/changePassword')
    .put(async (req, res) => {
        const { email, newPassword } = req.body
        try {

            if (!req.headers.authorization) {
                res.json({ status: '500', message: 'No token provided' })
                return;
            }

            const token = req.headers.authorization.split(" ")[1]

            //TODO: Check expiration time
            jwt.verify(token, 'Olamundo', function (err, decoded) {
                if (err) {
                    res.json({ status: '500', message: res })
                    return;
                }
            })

            const output = await authenticationIterator.changePassword(changePasswordMqtt, { email, newPassword })
            res.json(output);
        } catch (error) {
            throw error;
        }
    })

router.route('/verifyAccount')
    .put(async (req, res) => {
        const { email, code } = req.body;

        try {
            const output = await authenticationIterator.updateAccount(verifyAccount.verifyAccountMqtt, { email, code })
            res.json(output);
        } catch (error) {
            throw error;
        }
    })

module.exports = router
