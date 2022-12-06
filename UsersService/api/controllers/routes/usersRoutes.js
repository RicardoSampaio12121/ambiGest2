const router = require('express').Router()

const usersIterator = require("../../use-cases/usersIteratorMongoDB");
const createUserPersistence = require("../../use-cases/createUserPersistenceMongoDB");
const updateUserPersistence = require("../../use-cases/updateUserPersistenceMongoDB");
const updateEmailPersistence = require("../../use-cases/updateEmailPersistenceMongoDB");
const deleteUserPersistence = require("../../use-cases/deleteUserPersistenceMongoDB");
const getAllUsersPersistence = require("../../use-cases/getAllUsersPersistenceMongoDB");
const getSingleUserPersistence = require("../../use-cases/getSingleUserPersistenceMongoDB");

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

router.route('/updateEmail')
    .put(async (req, res) => {
        const {currentEmail, newEmail} = req.body;

        try{
            const output = await usersIterator.updateEmailIterator(updateEmailPersistence, {currentEmail, newEmail})
            res.json(output);
        }catch(error){
            throw error;
        }
    })

router.route('/deleteUser')
    .delete(async (req, res) => {
        const {email} = req.body;
        try{
            const output = await usersIterator.deleteUserIterator(deleteUserPersistence, {email})
            res.json(output);
        }catch(error){
            throw error;
        }
    })

router.route('/getUser/:email')
    .get(async (req, res) => {
        var email = req.params.email

        try{
            const output = await usersIterator.getSingleUserIterator(getSingleUserPersistence, {email})
            res.json(output);
        }catch(error){
            throw error;
        }
    })

router.route('/getAll')
    .get(async (req, res) => {
        try{
            const output = await usersIterator.getAllUsersIterator(getAllUsersPersistence);
            res.json(output);
        }catch(error){
            throw error;
        }
    })

module.exports = router;
