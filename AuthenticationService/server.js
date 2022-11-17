const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use("/api", require('./api/routes/authenticationRoutes'))

let port = 8888
app.listen(port, () => {
    console.log('Server at ' + port)
})