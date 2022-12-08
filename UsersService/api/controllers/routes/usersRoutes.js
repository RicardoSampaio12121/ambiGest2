const router = require('express').Router()
const jwt = require('jsonwebtoken');

const usersIterator = require("../../use-cases/usersIteratorMongoDB");
const createUserPersistence = require("../../use-cases/createUserPersistenceMongoDB");
const updateUserPersistence = require("../../use-cases/updateUserPersistenceMongoDB");
const updateEmailPersistence = require("../../use-cases/updateEmailPersistenceMongoDB");
const deleteUserPersistence = require("../../use-cases/deleteUserPersistenceMongoDB");
const getAllUsersPersistence = require("../../use-cases/getAllUsersPersistenceMongoDB");
const getSingleUserPersistence = require("../../use-cases/getSingleUserPersistenceMongoDB");

/**
 * @api {post} /api/createUser/ Create a new user
 * @apiName User Service
 * @apiGroup Users
 *
 * @apiParam {String} name Primeiro Nome
 * @apiParam {String} surname Ultimo nome
 * @apiParam {String} email Email
 * @apiParam {String} birthdate Data de Nascimento
 * @apiParam {String} code Nivel
 * 
 *
 * @apiSuccessExample {Json} Sucesso
 *  HTTP/1.1 200 ok 
 * {
    "status": "200",
    "Description": "User criado"
 * }
 */
router.route('/createUser')
    .post(async (req, res) => {
        const { name, surname, email, birthdate, code } = req.body;

        try {
            const output = await usersIterator.createUserIterator(createUserPersistence, { name, surname, email, birthdate, code })
            res.json(output);
        } catch (error) {
            throw error;
        }
    })

/**
 * @api {put} /api/updateUser/ Edit a new user
 * @apiName User Service
 * @apiGroup Users
 *
 * @apiParam {String} name Primeiro Nome
 * @apiParam {String} surname Ultimo nome
 * @apiParam {String} email Email
 * @apiParam {String} birthdate Data de Nascimento
 * 
 *
 * @apiSuccessExample {Json} Sucesso
 *  HTTP/1.1 200 ok 
 * {
    "status": "200",
    "Description": "User alterado"
 * }
 */
router.route('/updateUser')
    .put(async (req, res) => {
        const { name, surname, email, birthdate } = req.body;

        try {
            const output = await usersIterator.updateUserIterator(updateUserPersistence, { name, surname, email, birthdate })
            res.json(output);
        } catch (error) {
            throw error;
        }
    })

/**
* @api {put} /api/updateEmail/ Change user email
* @apiName User Service
* @apiGroup Users
*
* @apiParam {String} currentEmail Email atual
* @apiParam {String} newEmail Novo Email
* 
*
* @apiSuccessExample {Json} Sucesso
*  HTTP/1.1 200 ok 
* {
"status": "200",
"Description": "Email alterado"
* }
*/
router.route('/updateEmail')
    .put(async (req, res) => {
        const { currentEmail, newEmail } = req.body;

        try {
            const output = await usersIterator.updateEmailIterator(updateEmailPersistence, { currentEmail, newEmail })
            res.json(output);
        } catch (error) {
            throw error;
        }
    })


/**
* @api {delete} /api/deleteUser/ Delete user 
* @apiName User Service
* @apiGroup Users
*
* @apiParam {String} email Email
* 
*
* @apiSuccessExample {Json} Sucesso
*  HTTP/1.1 200 ok 
* {
"status": "200",
"Description": "User deleted"
* }
*/
router.route('/deleteUser')
    .delete(async (req, res) => {
        const { email } = req.body;
        try {

            if (!req.headers.authorization) {
                res.json({ status: '500', message: 'No token provided' })
                return;
            }

            const token = req.headers.authorization.split(" ")[1]

            jwt.verify(token, 'Olamundo', function (err, decoded) {
                if (err) {
                    res.json({ status: '500', message: 'Token has expired' })
                    return;
                }

                if (decoded.UserInfo.email != email) {
                    res.json({ status: '403', message: "This is not your email" })
                    return;
                }
            })
            const output = await usersIterator.deleteUserIterator(deleteUserPersistence, { email })
            res.json(output);
        } catch (error) {
            throw error;
        }
    })


/**
* @api {get} /api/getUser/:email Search User
* @apiName User Service
* @apiGroup Users
*
* @apiParam {String} email Email
* 
*
* @apiSuccessExample {Json} Sucesso
*  HTTP/1.1 200 ok 
* {
"status": "200",
"Description": "Users retrieved"
* }
*/
router.route('/getUser/:email')
    .get(async (req, res) => {
        var email = req.params.email

        try {

            if (!req.headers.authorization) {
                res.json({ status: '500', message: 'No token provided' })
                return;
            }

            const token = req.headers.authorization.split(" ")[1]

            jwt.verify(token, 'Olamundo', function (err, decoded) {
                if (err) {
                    res.json({ status: '500', message: 'Token has expired' })
                    return;
                }

                if (decoded.UserInfo.email != email) {
                    res.json({ status: '403', message: "This is not your email" })
                    return;
                }
            })

            const output = await usersIterator.getSingleUserIterator(getSingleUserPersistence, { email })
            res.json(output);
        } catch (error) {
            throw error;
        }
    })

/**
* @api {post} /api/getAll/ Get All Users
* @apiName User Service
* @apiGroup Users
*
* 
*
* @apiSuccessExample {Json} Sucesso
*  HTTP/1.1 200 ok 
* {
"status": "200",
"Description": "All Users retrieved"
* }
*/
router.route('/getAll')
    .get(async (req, res) => {
        try {

            if (!req.headers.authorization) {
                res.json({ status: '500', message: 'No token provided' })
                return;
            }

            const token = req.headers.authorization.split(" ")[1]

            jwt.verify(token, 'Olamundo', function (err, decoded) {
                if (err) {
                    res.json({ status: '500', message: 'Token has expired' })
                    return;
                }

                if (decoded.UserInfo.role != "admin") {
                    res.json({ status: '403', message: "You have to be an admin" })
                    return;
                }
            })

            const output = await usersIterator.getAllUsersIterator(getAllUsersPersistence);
            res.json(output);
        } catch (error) {
            throw error;
        }
    })

module.exports = router;
