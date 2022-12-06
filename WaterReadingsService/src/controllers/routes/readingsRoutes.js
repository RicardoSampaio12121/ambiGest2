const jwt = require('jsonwebtoken');

const router = require('express').Router()

const readingIterator = require('../../use-cases/readingsIterator');
const { createReadingPersistence } = require('../../use-cases/createReadingIterator');
const { getReadingsPersistence } = require('../../use-cases/getReadingsPersistence');
const {getAllReadingsPersistence} = require('../../use-cases/getAllReadingsPersistence');

router.route('/addReading')
    .post(async (req, res) => {
        const { email, amount } = req.body;

        if (!req.headers.authorization) {
            res.json({ status: '500', message: 'No token provided' })
        }

        const token = req.headers.authorization.split(" ")[1]

        //TODO: Check expiration time
        jwt.verify(token, 'Olamundo', function (err, decoded) {
            if (err) res.json({ status: '500', message: 'Token has expired' })
        })

        //const output = await readingIterator.createReadingIterator(createReadingPersistence, {email, amount});

        const output = await readingIterator.createReadingIterator(createReadingPersistence, { email, amount });

        console.log("Antes de dar return: " + output.message)
        res.json(output);
    })

router.route('/getReadings/:email')
    .get(async (req, res) => {
        const email = req.params.email

        console.log(email)

        try {
            if (!req.headers.authorization) {
                res.json({ status: '500', message: 'No token provided' })
            }

            const token = req.headers.authorization.split(" ")[1]

            jwt.verify(token, 'Olamundo', function (err, decoded) {
                if (err) res.json({ status: '500', message: 'Token has expired' })
            })

            const output = await readingIterator.getReadingsIterator(getReadingsPersistence, { email });

            console.log(output.message);

            res.json(output);

        } catch (error) {
            throw error;
        }
    })

router.route('/getAll')
    .get(async (req, res) => {
        try {
            if (!req.headers.authorization) {
                res.json({ status: '500', message: 'No token provided' })
            }

            const token = req.headers.authorization.split(" ")[1]

            jwt.verify(token, 'Olamundo', function (err, decoded) {
                if (err) res.json({ status: '500', message: err })
            });

            const output = await readingIterator.getAllReadingsIterator(getAllReadingsPersistence, {email})
            console.log(output.message);
            res.json(output);

        } catch (error) {

        }
    })
module.exports = router