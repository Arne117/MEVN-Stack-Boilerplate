require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const cors = require('cors')

const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

const logger = require('./helpers/logger')
const apiV1 = require('./api/v1/')

const port = process.env.PORT || 8081

app.use('/api/v1', apiV1)
app.use(express.static('public'))

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
