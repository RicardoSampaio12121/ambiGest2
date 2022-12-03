const router = require("express").Router();

const logIterator = require("../../use-cases/logIteratorMongoDB");
const createLog = require("../../use-cases/createLogPersistenceMongoDB");
const searchlog = require("../../use-cases/searchLogPersistenceMongoDB");

router.route("/addLog").post(async (req, res) => {
  const { message } = req.body;
  const { type } = req.body;

  try {
    const output = await logIterator.createLogIterator(createLog, {
      type,
      message,
    });
    res.json(output);
  } catch (error) {
    throw error;
  }
});

router.route("/getLog/:query/").get(async (req, res) => {
  const { message } = req.body;
  const query = req.params.query;
  const type = "null";

  try {
    const output = await logIterator.searchLogIterator(searchlog, {
      type,
      query,
    });
    res.json(output);
  } catch (error) {
    throw error;
  }
});

router.route("/getLogType/:type/").get(async (req, res) => {
  const query = null;
  const type = req.params.type;

  try {
    const output = await logIterator.searchLogIterator(searchlog, {
      type,
      query,
    });
    res.json(output);
  } catch (error) {
    throw error;
  }
});

router.route("/getLogType/:type/:query/").get(async (req, res) => {
  const query = req.params.query;
  const type = req.params.type;

  try {
    const output = await logIterator.searchLogIterator(searchlog, {
      type,
      query,
    });
    res.json(output);
  } catch (error) {
    throw error;
  }
});

/*
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
*/
module.exports = router;
