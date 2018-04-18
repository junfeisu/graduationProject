const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderGenerate = require('./sequence').order

const orderSchema = new Schema({
  order_id: {
    type: Number,
    unique: true
  },
  arrange: {
    type: Number,
    ref: 'Arrange',
    rquired: true
  },
  user: {
    type: Number,
    ref: 'User',
    required: true
  },
  num: {
    type: Number,
    default: 1
  }
})

orderSchema.index({arrange_id: 1, user_id: 1}, {unique: true})

orderSchema.pre('save', function (next) {
  var that = this
  if (this.isNew) {
    orderGenerate.increase('OrderGenerate', function (err, res) {
      if (err) {
        console.log('err is ' + JSON.stringify(err))
      } else {
        that.order_id = res.value.next
        next()
      }
    })
  } else {
    next()
  }
})

module.exports = mongoose.model('Order', orderSchema)
