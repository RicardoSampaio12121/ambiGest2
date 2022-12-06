const router = require('express').Router()

const garbageCollectionIterator = require('../../use-cases/garbageCollectionIterator');
const {createGBPersistence} = require('../../use-cases/createGBPersistence');
const {getGBPersistence} = require('../../use-cases/getGBPersistence')
const {getAllGPersistence} = require('../../use-cases/getAllGBPersistence')

router.route('/create')
    .post(async (req, res) => {
        const { email, type, date } = req.body;
        try {
            const output = await garbageCollectionIterator.createGBIterator(createGBPersistence, {email, type, date})
            res.json(output);
        } catch (error) {
            throw error;
        }
    });

router.route('/delete/:id')
    .delete(async (req, res) => {
        const id = req.params.id;

    })

router.route('/get/:email')
    .get(async (req, res) => {
        const email = req.params.email

        try{
            const output = await garbageCollectionIterator.getGBIterator(getGBPersistence, {email})
            res.send(output);
        }catch(error){
            throw error;
        }
    })

router.route('/getAll')
    .get(async (req, res) => {
        //Has to be admin or something higher than a regular user

        try{
            const output = await garbageCollectionIterator.getAllGBIterator(getAllGPersistence);
            res.send(output)
        }catch(error){
            throw error;
        }
    })

module.exports = router;