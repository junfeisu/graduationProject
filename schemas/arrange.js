const mongoose = require('mongoose')
const Schema = mongoose.Schema
const arrangeGenerate = require('./sequence').arrange

const arrangeSchema = new Schema({
  arrange_id: {
    type: Number,
    unique: true
  },
  movie: {
    type: Number,
    required: true,
    ref: 'Movie'
  },
  cinema: {
    type: Number,
    required: true,
    ref: 'Cinema'
  },
  time: {
    type: Date,
    required: true
  },
  price: {
    type: Schema.Types.Decimal128,
    required: true
  },
  room: {
    type: Number,
    required: true,
  }
}, {versionKey: false})

arrangeSchema.index({movie: 1, cinema: 1, time: -1, room: 1}, {unique: true})

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
