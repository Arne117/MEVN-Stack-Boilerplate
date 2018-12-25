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
    locale: { type: String, default: 'de' },
    pages: {
      type: Array,
      default: [{
        name: 'Page 1',
        title: 'Titel der ersten Seite',
        position: { x: 25, y: 25 },
        elements: []
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
