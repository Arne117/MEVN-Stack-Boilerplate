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
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/Bachelorarbeit?authSource=admin`,
  { useNewUrlParser: true }
)
const Schema = mongoose.Schema

const SurveySchema = new Schema(
  {
    title: { type: String, required: true },
    locale: { type: String, default: 'en' },
    pages: {
      type: Array,
      required: true,
      default: [{
        name: 'Page 1',
        title: 'Titel of page 1',
        position: { x: 25, y: 25 }
      }]
    }
  },
  {
    _id: true,
    collection: 'Surveys',
    timestamps: true
  }
)

module.exports = db.model('Survey', SurveySchema)
