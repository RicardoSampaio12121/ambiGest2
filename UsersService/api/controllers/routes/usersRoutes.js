const router  = require('express').Router()

const usersIterator = require("../../use-cases/usersIteratorMongoDB");
const createUserPersistence = require("../../use-cases/createUserPersistenceMongoDB");

router.route('/createUser')
    .post(async (req, res) => {
        const { name, surname, email, birthdate, role } = req.body;

        try{
            const output = usersIterator.createUserIterator(createUserPersistence, {name, surname, email, birthdate, role})
            res.json(output);
        }catch(error){
            throw error;
        }
    })