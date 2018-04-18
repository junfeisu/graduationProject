const Boom = require('boom')
const Joi = require('joi')
const arrangeModel = require('../schemas/arrange')

const addArragne = {
  method: 'POST',
  path: '/arrange/add',
  config: {
    validate: {
      payload: {

      }
    }
  },
  handler: (req, reply) => {
    new arrangeModel(req.body).save(function (err, arrange) {
      if (err) {
        reply(Boom.badImplementation(err.message))
      } else {
        reply({status: 1, data: arrange})
      }
    }) 
  }
}

const deleteArrange = {
  method: 'POST',
  path: '/arrange/delete',
  config: {
    validate: {
      payload: {

      }
    }
  },
  handler: (req, reply) => {
    const { arrange_id } = req.body
    arrangeModel.remove({arrange_id: arrange_id}, function(err, result) {
      if (err) {
        reply(Boom.badImplementation(err.message))
      } else {
        result.result.n ? reply({status: 1, message: '删除成功'}) : reply({status: 0, message: '删除失败'})
      }
    })
  }
}

module.exports = [addArragne, deleteArrange]
