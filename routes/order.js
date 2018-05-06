const Boom = require('boom')
const Joi = require('joi')
const orderModel = require('../schemas/order')
const arrangeModel = require('../schemas/arrange')
const Events = require('events')
const roomUtils = require('../utils/roomUtils')

const addOrder = {
  method: 'POST',
  path: '/order/add',
  options: {
    validate: {
      payload: {
        user: Joi.number().integer().min(1).required(),
        arrange: Joi.number().integer().min(1).required(),
        num: Joi.number().integer().min(1).required(),
        seats: Joi.array().required()
      }
    },
    handler: (req, reply) => {
      const { arrange, seats } = req.payload
      const event = new Events()

      return new Promise((resolve, reject) => {
        event.on('Error', message => {
          reject({status: 0, message: message})
        })

        event.on('updateRoom', arrange => {
          roomUtils.updateRoom(arrange, seats, event)
        })

        event.on('generateOrder', () => {
          new orderModel(req.payload).save((err, order) => {
              if (err) {
                reject(Boom.badImplementation(err.message))
              } else {
                resolve({status: 1, data: order})
              }
          })
        })
        
        roomUtils.findRoom(arrange, event)
      })
    }
  }
}

// const cancelOrder = {
//   method: 'POST',
//   path: '/order/cancel',
//   options: {
//     validate: {
//       payload: {
//         orderId: Joi.number().integer().min(1).required(),
//         arrangeId: Joi.number().integer().min(1).required(),
//         seats: Joi.array().required()
//       }
//     },
//     handler: (req, reply) => {
//       const { orderId, arrangeId, seats } = req.payload

//       return new Promise((resolve, reject) => {
//         arrangeModel.findOne({_id: arrangeId}, (findErr, arrange) {
//           if (findErr) {
//             reject()
//           }
//         })
//         arrangeModel.findOneAndUpdate({_id: arrangeId}, {$set: {seats: seats}})
//       })
//     }
//   }
// }

const getOrders = {
  method: 'GET',
  path: '/order/{user_id}',
  options: {
    validate: {
      params: {
        user_id: Joi.number().integer().min(1).required()
      }
    },
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        orderModel.find({user: req.params.user_id}, (err, orders) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            if (orders.length) {
              orders.forEach((val, index) => {
                arrangeModel.findOne({_id: val.arrange})
                  .exec((err, arrange) => {
                    if (err) {
                      reject(Boom.badImplementation(err.message))
                    } else {
                      arrange.populate({path: 'movie'}, (popErr, popDoc) => {
                        let finish = true

                        val.arrange = popDoc
                        val.finish = true

                        for (var i = 0; i < orders.length; i++) {
                          if (!orders[i].finish) {
                            finish = false
                            break
                          }
                        }

                        if (finish) {
                          resolve({status: 1, data: orders})
                        }
                      })
                    }
                  })
              })
            } else {
              resolve({status: 1, data: orders})
            }
          }
        })
      })
    }
  }
}

const deleteOrder = {
  method: 'POST',
  path: '/order/delete/{order_id}',
  options: {
    validate: {
      params: {
        order_id: Joi.number().integer().min(1).required()
      }
    },
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        orderModel.findOneAndRemove({_id: req.params.order_id}, (err, order) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            order ? resolve({status: 1, message: '删除成功'}) : resolve({status: 0, message: '删除失败'})
          }
        })
      })
    }
  }
}

module.exports = [addOrder, getOrders, deleteOrder]
