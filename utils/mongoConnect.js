var mongoose = require('mongoose')

function connect () {
  mongoose.connect('mongodb://localhost/graduationProject')

  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
    console.log('connection has been established')
  })
}

module.exports = connect
