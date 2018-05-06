const arrangeModel = require('../schemas/arrange')

const roomUtils = {
  findRoom (arrangeId, event) {
    arrangeModel.findOne({_id: arrangeId}, (err, result) => {
      if (err) {
        event.emit('Error', err.message)
      } else {
        event.emit('updateRoom', result)
      }
    })
  },
  updateRoom (arrange, seats, event) {
    seats.forEach(seat => {
      arrange.room[seat.seat_row - 1][seat.seat_col - 1].saled = true
    })

    arrangeModel.findOneAndUpdate({_id: arrange._id}, {$set: {room: arrange.room}}, (err, arrange) => {
      if (err) {
        event.emit('Error', err.message)
      } else {
        if (arrange) {
          event.emit('generateOrder')
        } else {
          event.emit('Error', '该场电影安排已经下线或者过期')
        }
      }
    })
  }
}

module.exports = roomUtils
