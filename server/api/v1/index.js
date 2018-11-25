const express = require('express')
const apiV1 = express.Router()

const surveys = require('./routes/surveys')

apiV1.use('/surveys', surveys)

module.exports = apiV1
