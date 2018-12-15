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
  res.status(500).json({ 'error': { 'message': 'Something went wrong!', 'code': 500 } })
})

app.use((req, res, next) => {
  res.status(404).json({ 'error': { 'message': 'Page missing!', 'code': 404 } })
})

app.listen(port, err => {
  if (err !== undefined) logger.error(`Error on startup http: ${err}`)
  else logger.info(`Listening http on port: ${port}`)
})
