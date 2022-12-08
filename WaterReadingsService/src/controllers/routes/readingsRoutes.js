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

        try {
            if (!req.headers.authorization) {
                res.json({ status: '500', message: 'No token provided' })
            }

            const token = req.headers.authorization.split(" ")[1]

            jwt.verify(token, 'Olamundo', function (err, decoded) {
                if (err) res.json({ status: '500', message: 'Token has expired' })

                if(decoded.UserInfo.email != email) res.json({status: '403', message: "This is not your email"})
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
                if(decoded.UserInfo.role != "admin") res.json({status: '403', message: "You do not have permission to access this endpoint."});
            });

            const output = await readingIterator.getAllReadingsIterator(getAllReadingsPersistence)
            console.log(output.message);
            res.json(output);

        } catch (error) {
            throw error;
        }
    })
module.exports = router