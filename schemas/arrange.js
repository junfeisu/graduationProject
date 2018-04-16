const mongoose = require('mongoose')
const Schema = mongoose.Schema
const arrangeGenerate = require('./sequence').arrange

const arrangeSchema = new Schema({
  arrange_id: {
    type: Number,
    unique: true
  },
  movie_id: {
    type: Number,
    required: true
  },
  cinema_id: {
    type: Number,
    required: true
  },
  time: {
    type: Date,
    default: Date.now()
  },
  price: {
    type: Schema.Types.Decimal128,
    required: true
  },
  room_id: {
    type: Number,
    required: true
  }
}, {versionKey: false})

arrangeSchema.index({movie_id: 1, cinema_id: 1, time: -1, room_id: 1}, {unique: true})

arrangeSchema.pre('save', function (next) {
  var that = this
  if (this.isNew) {
    arrangeGenerate.increase('ArrangeGenerate', function (err, res) {
      if (err) {
        console.log('err is ' + JSON.stringify(err))
      } else {
        console.log('res is ' + JSON.stringify(res))
        that.arrange_id = res.value.next
        next()
      }
    })
  } else {
    next()
  }
})

module.exports = mongoose.model('Arrange', arrangeSchema)
