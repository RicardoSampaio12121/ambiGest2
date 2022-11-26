const router = require('express').Router()

const usersIterator = require("../../use-cases/usersIteratorMongoDB");
const createUserPersistence = require("../../use-cases/createUserPersistenceMongoDB");
const updateUserPersistence = require("../../use-cases/updateUserPersistenceMongoDB");
const deleteUserPersistence = require("../../use-cases/deleteUserPersistenceMongoDB");

router.route('/createUser')
    .post(async (req, res) => {
        const { name, surname, email, birthdate, role } = req.body;

        try {
            const output = await usersIterator.createUserIterator(createUserPersistence, { name, surname, email, birthdate, role })
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
        
    })

router.route('/getAll')
    .get(async (req, res) => {

    })

module.exports = router;
