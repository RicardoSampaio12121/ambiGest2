const router = require("express").Router();

const logIterator = require("../../use-cases/logIteratorMongoDB");
const createLog = require("../../use-cases/createLogPersistenceMongoDB");
const searchlog = require("../../use-cases/searchLogPersistenceMongoDB");

/**
 * @api {post} /api/addlog/ Creates a Log
 * @apiName Log Service
 * @apiGroup Logs
 *
 * @apiParam {String} message Log
 * @apiParam {String} type Tipo
*
 * @apiSuccessExample {Json} Sucesso
 *  HTTP/1.1 200 ok 
 * {
    "status": "200",
    "Description": "Log Added"
 * }
 */
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

/**
 * @api {get} /api/getLog/:query/ General query for a Log
 * @apiName Log Service
 * @apiGroup Logs
 *
 * @apiParam {String} query Log
 *
 */
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

/**
 * @api {get} /api/getLogType/:type/ Query last 5 events of a certain type of log
 * @apiName Log Service
 * @apiGroup Logs
 *
 * @apiParam {String} type Tipo
 *
 */
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

/**
 * @api {get} /api/getLogType/ Query by types of log for a Log
 * @apiName Log Service
 * @apiGroup Logs
 *
 * @apiParam {String} query Log
 * @apiParam {String} type Tipo
 *
 */
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
