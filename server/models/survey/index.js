/** This module defines the mongoose schema for a Survey
 *
 * @author Arne Rolf
 *
 * @module models/survey/index.js
 * @type {mongoose schema}
 */

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const db = mongoose.createConnection(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/surveys?authSource=admin`,
  { useMongoClient: true }
)
const Schema = mongoose.Schema

const SurveySchema = new Schema(
  {
    title: { type: String, required: true },
    surveyData: { type: Object, required: true, default: {} }
  },
  {
    _id: true,
    collection: 'banners',
    timestamps: true
  }
)

module.exports = db.model('Survey', SurveySchema)
