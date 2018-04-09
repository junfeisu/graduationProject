const mongoose = require('mongoose')
const Schema = mongoose.Schema
const movieGenerate = require('./sequence').movie

const movieSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  movie_id: {
    type: Number,
    require: true,
    unique: true
  },
  duration: {
    type: String,
    required: true
  },
  types: [String],
  starring: [String],
  director: [String],
  desc: String,
  area: String
}, {versionKey: false})

movieSchema.pre('save', function (next) {
  var that = this
  if (this.isNew) {
    movieGenerate.increase('MovieGenerate', function(err, res) {
      if (err) {
        console.log('err is' + JSON.stringify(err))
      } else{
        console.log('res is ' + JSON.stringify(res))
        that.movie_id = res.value.next
        next()
      }
    })
  } else {
    next()
  }
})

module.exports = mongoose.model('Movie', movieSchema)


