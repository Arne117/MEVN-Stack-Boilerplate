const SurveyModel = require('../../../models/survey/')

const express = require('express')
const surveys = express.Router({ mergeParams: true })

surveys.route('/')
  .get((req, res, next) => {
    SurveyModel.find({}, (err, items) => {
      if (!err) res.status(200).json(items)
      else {
        err.status = 400
        next(err)
      }
    })
  })
  .post((req, res, next) => {
    const survey = new SurveyModel(req.body)
    survey.save(err => {
      if (!err) {
        res.status(201).json(survey)
      } else {
        err.status = 400
        err.message += ' in fields: ' + Object.getOwnPropertyNames(err.errors)
        next(err)
      }
    })
  })
  .put((req, res, next) => {
    res.status(405).json({ 'error': { 'message': 'Put to wrong URL with id', 'code': 405 } })
  })
  .delete((req, res, next) => {
    res.status(400).json({ 'error': { 'message': 'Delete to URL without id', 'code': 400 } })
  })

surveys.route('/:id')
  .get((req, res, next) => {
    SurveyModel.findOne({ _id: req.params.id }, (err, item) => {
      if (!err) {
        res.status(200).json(item)
      } else {
        err.status = 400
        err.message = 'Could not find by ID'
        next(err)
      }
    })
  })
  .post((req, res, next) => {
    res.status(405).json({ 'error': { 'message': 'Post to wrong URL with ID', 'code': 405 } })
  })
  .delete((req, res, next) => {
    res.set('Content-Type', 'application/json')
    SurveyModel.findOneAndRemove({ _id: req.params.id }, (err, item) => {
      if (!err) res.status(204).end()
      else {
        err.status = 400
        err.message = 'Could not find and delete by this ID'
        next(err)
      }
    })
  })
  .patch((req, res, next) => {
    res.set('Content-Type', 'application/json')

    if (req.params.id === req.body._id) {
      const err = {
        'status': 400,
        'message': 'Request ID is not equal to object ID'
      }
      next(err)
    } else {
      if (req.body.__v !== undefined) {
        delete req.body.__v
      }
      if (req.body._id !== undefined) {
        delete req.body._id
      }
      SurveyModel.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, new: true }, (err, item) => {
        if (!err) res.status(200).json(item)
        else {
          err.status = 400
          next(err)
        }
      })
    }
  })

module.exports = surveys
