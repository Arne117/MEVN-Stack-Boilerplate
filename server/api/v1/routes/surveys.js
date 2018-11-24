const SurveyModel = require('../../models/banner')

const express = require('express')
const surveys = express.Router()

surveys.route('/').get((req, res, next) => {
  SurveyModel.find({}, (err, items) => {
    if (!err) res.status(200).json(items)
    else {
      err.status = 400
      next(err)
    }
  })
})

module.exports = surveys
