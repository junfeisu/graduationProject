const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentGenerate = require('./sequence').comment

const commentSchema = new Schema({
  _id: {
    type: Number
  },
  comment_user: {
    type: Number,
    required: true
  },
  movie: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now()
  }
}, {
  versionKey: false,
  _id: false
})

commentSchema.pre('save', function(next) {
    var that = this
    if (this.isNew) {
        commentGenerate.increase('CommentGenerate', function(err, res) {
            if (err) {
                console.log('err is ' + JSON.stringify(err))
            } else {
                console.log('res is ' + JSON.stringify(res))
                that._id = res.value.next
                next()
            }
        })
    } else {
        next()
    }
})

module.exports = mongoose.model('Comment', commentSchema)
