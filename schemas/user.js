const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userGernate = require('./sequence').user

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  _id: {
    type: Number
  },
  role: {
    type: String,
    default: 'normal'
  },
  phone: {
    type: String,
    validate: {
      validator: (v) => {
        return /^1\d{10}$/.test(v)
      },
      message: '{VALUE} 不是一个合格的手机号码!'
    },
    required: [true, '手机号码是必填的']
  },
  password: {
    type: String,
    validate: {
      validator: (p) => {
        return p.length > 5 && p.length < 16
      },
      message: '密码的长度最短为6，最长为15'
    },
    required: [true, '密码不能为空']
  }
}, {versionKey: false, _id: false})

userSchema.index({username: 1, phone: 1}, {unique: true})

userSchema.pre('save', function (next) {
  var that = this
  if (this.isNew) {
    userGernate.increase('UserGenerate', function(err, res) {
      if (err) {
        console.log('err is' + JSON.stringify(err))
      } else{
        console.log('res is ' + JSON.stringify(res))
        that._id = res.value.next
        next()
      }
    })
  } else {
    next()
  }
})

module.exports = mongoose.model('User', userSchema)
