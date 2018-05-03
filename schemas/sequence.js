const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userGenerateSchema = new Schema({
  _id: String,
  next: {
    type: Number,
    default: 1
  }
})

const movieGenerateSchema = new Schema({
  _id: String,
  next: {
    type: Number,
    default: 1
  }
})

const cinemaGenerateSchema = new Schema({
  _id: String,
  next: {
    type: Number,
    default: 1
  }
})

const orderGenerateSchema = new Schema({
  _id: String,
  next: {
    type: Number,
    default: 1
  }
})

const arrangeGenerateSchema = new Schema({
  _id: String,
  next: {
    type: Number,
    default: 1
  }
})

const commentGenerateSchema = new Schema({
  _id: String,
  next: {
    type: Number,
    default: 1
  }
})

function increase (schemaName, callback) {
  return this.collection.findOneAndUpdate(
    {'_id': schemaName},
    {$inc: {"next": 1}},
    {upset: true, returnNewDocument: true},
    callback
  )
}

userGenerateSchema.statics.increase = increase
movieGenerateSchema.statics.increase = increase
cinemaGenerateSchema.statics.increase = increase
orderGenerateSchema.statics.increase = increase
arrangeGenerateSchema.statics.increase = increase
commentGenerateSchema.statics.increase = increase

module.exports = {
  user: mongoose.model('UserGenerate', userGenerateSchema),
  movie: mongoose.model('MovieGenerate', movieGenerateSchema),
  cinema: mongoose.model('CinemaGenerate', cinemaGenerateSchema),
  order: mongoose.model('OrderGenerate', orderGenerateSchema),
  arrange: mongoose.model('ArrangeGenerate', arrangeGenerateSchema),
  comment: mongoose.model('CommentGenerate', commentGenerateSchema)
}
