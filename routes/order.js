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
        reply({status: 1, data: order})
      }
    })
  }
}

const getOrder = {
  method: 'GET',
  path: '/order/{user_id}',
  config: {
    validate: {
      params: {
        user_id: Joi.number().integer().min(1).required()
      }
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

const deleteOrder = {
  method: 'POST',
  path: '/order/delete/{order_id}',
  config: {
    validate: {
      params: {
        order_id: Joi.number().integer().min(1).required()
      }
    }
  },
  handler: (req, reply) => {
    orderModel.remove({order_id: req.params.order_id}, (err, result) => {
      if (err) {
        reply(Boom.badImplementation(err.message))
      } else {
        result.result.n ? reply({status: 1, message: '删除成功'}) : reply({status: 0, message: '删除失败'})
      }
    })
  }
}

module.exports = [addOrder, getOrder, deleteOrder]