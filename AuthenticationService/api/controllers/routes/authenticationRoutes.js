const router = require('express').Router()

const authenticationIterator = require("../../use-cases/authenticationIterator");
const loginMqtt = require("../../use-cases/loginMqtt");
const signupMqtt = require("../../use-cases/signupMqtt");
const changePasswordMqtt = require("../../use-cases/changePasswordMqtt")

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
        const {email, newPassword } = req.body
        try{
            const output = await authenticationIterator.changePassword(changePasswordMqtt, {email, newPassword})
            res.json(output);
        }catch(error) {
            throw error;
        }
    })

module.exports = router
