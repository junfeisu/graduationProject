const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderGenerate = require('./sequence').order

const orderSchema = new Schema({
  order_id: {
    type: Number,
    unique: true,
    required: true
  },
  arrange_id: {
    type: Number,
    rquired: true
  },
  user_id: {
    type: Number,
    required: true
  },
  num: {
    type: Number,
    default: 1
  }
})

orderSchema.pre('save', function (next) {
  var that = this
  if (this.isNew) {
    orderGenerate.increase('OrderGenerate', function (err, res) {
      if (err) {
        console.log('err is ' + JSON.stringify(err))
      } else {
        console.log('res is ' + JSON.stringify(res))
        that.order_id = res.value.next
        next()
      }
    })
  } else {
    next()
  }
})

module.exports = mongoose.model('Order', orderSchema)
