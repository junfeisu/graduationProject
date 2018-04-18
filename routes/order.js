const Boom = require('boom')
const Joi = require('joi')
const orderModel = require('../schemas/order')

const addOrder = {
  method: 'POST',
  path: '/order/add',
  config: {
    validate: {
      payload: {
        user_id: Joi.number().integer().min(1).required(),
        arrange_id: Joi.number().integer().min(1).required(),
        num: Joi.number().integer().min(1).required()
      }
    }
  },
  handler: (req, reply) => {
    new orderModel(reply.payload).save((err, order) => {
      if (err) {
        reply(Boom.badImplementation(err.message))
      } else {
        reply(status: 1, data: order)
      }
    })
  }
}

const getOrder = {
  method: 'GET',
  path: '/order/{user_id}',
  config: {
    params: {
      user_id: Joi.number().integer().min(1).required()
    }
  },
  handler: (req, reply) => {
    orderModel.find({user_id: req.params.user_id}, (err, result) => {
      if (err) {
        reply(Boom.badImplementation(err.message))
      } else {
        reply({status: 1, data: result})
      }
    })
  }
}

module.exports = [addOrder, deleteOrder]