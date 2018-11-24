require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const logger = require('../helpers/logger')
const testjson = require('./surveyTestData')

const port = process.env.PORT || 8081

app.get('/surveys', (req, res) => {
  res.send(testjson)
})

app.use((err, req, res, next) => {
  logger.error(err.stack)
  res.status(500).render('error', { errorCode: 500, error: 'Something went wrong' })
})

app.use((req, res, next) => {
  res.status(404).render('error', { errorCode: 404, error: 'Page missing' })
})

app.listen(port, err => {
  if (err !== undefined) {
    logger.error(`Error on startup http: ${err}`)
  } else {
    logger.info(`Listening http on port: ${port}`)
  }
})
