const Boom = require('boom')
const Joi = require('joi')
const orderModel = require('../schemas/order')

const addOrder = {
  method: 'POST',
  path: '/order/add',
  options: {
    validate: {
      payload: {
        user_id: Joi.number().integer().min(1).required(),
        arrange_id: Joi.number().integer().min(1).required(),
        num: Joi.number().integer().min(1).required()
      }
    },
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        new orderModel(reply.payload).save((err, order) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            resolve({status: 1, data: order})
          }
        })
      })
    }
  }
}

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
        orderModel.find({user: req.params.user_id}, (err, result) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            resolve({status: 1, data: result})
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
        orderModel.remove({_id: req.params.order_id}, (err, result) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            result.result.n ? resolve({status: 1, message: '删除成功'}) : resolve({status: 0, message: '删除失败'})
          }
        })
      })
    }
  }
}

module.exports = [addOrder, getOrders, deleteOrder]
