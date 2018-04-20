const mongoose = require('mongoose')
const Schema = mongoose.Schema
const movieGenerate = require('./sequence').movie

const movieSchema = new Schema({
  _id: Number,
  zh_name: String,
  foreign_name: String,
  image: String,
  directors: [{}],
  scenarists: [{}],
  actors: [{}],
  genres: [String],
  initialReleaseDate: [String],
  runtime: String,
  imdb: {},
  summary: String,
  recommendations: [{}],
  average: Number,
  tags: [String],
  language: [String],
  region: [String],
  aka: [String],
  votes: Number
}, {versionKey: false})

module.exports = mongoose.model('Movie', movieSchema)
