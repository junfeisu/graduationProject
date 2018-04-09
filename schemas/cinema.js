const mongoose = require('mongoose')
const Schema = mongose.Schema
const cinemaGenerate = require('./sequence').cinema

const cinemaSchema = new Schema({
  cniema_id: {
    type: Number,
    required: true,
    unique: true
  },
  adress: {
    type: String,
    required: true,
    unique: true
  },
  contact: {
    type: String,
    required: true,
    unique: true
  },
  evaluation: {
    type: Number,
    default: 5.0
  },
  seats: [{
    seat_row: {
      type: Number,
      required: true
    },
    seat_column: {
      type: Number,
      required: true
    },
    saled: {
      type: Boolean,
      default: false
    }
  }]
}, {versionKey: false})

cinemaSchema.pre('save', function (next) {
  var that = this
  if (this.isNew) {
    cinemaGenerate.increase('CinemaGenerate', function (err, res) {
      if (err) {
        console.log('err is ' + JSON.stringify(err))
      } else {
        console.log('res is ' + JSON.stringify(res))
        that.cniema_id = res.value.next
        next()
      }
    })
  } else {
    next()
  }
})

module.exports = mongoose.model('Cinema', cinemaSchema)
