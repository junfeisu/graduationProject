const arrangeModel = require('../schemas/arrange')

const orderUtil = {
  getSeats (arrangeId, events) {
    arrangeModel.findOne({_id: arrangeId}, (err, arrange) {
      if (err) {
        events.emit('Error', err.message)
      } else {
        arrange ? events.emit('updateSeats', arrange.room) : events.emit('')
      }
    })
  },
  updateSeats (wholeSeats, saledSeats, events) {
    
  }
}
