const Boom = require('boom')
const Joi = require('joi')
const arrangeModel = require('../schemas/arrange')

const addArragne = {
  method: 'POST',
  path: '/arrange/add',
  options: {
    validate: {
      payload: {
        movie: Joi.number().integer().min(1).required(),
        cinema: Joi.number().integer().min(1).required(),
        time: Joi.date().required(),
        price: Joi.number().min(0).required(),
        room: Joi.number().min(1).required()
      }
    },
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        new arrangeModel(req.payload).save((err, arrange) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            resolve({status: 1, data: arrange})
          }
        })
      })
    }
  }
}

const getArranges = {
  method: 'POST',
  path: '/arrange/search',
  options: {
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        arrangeModel.find(req.payload)
          .populate('cinema')
          .exec((err, arranges) => {
            if (err) {
              reject(Boom.badImplementation(err.message))
            } else {
              if (arranges.length) {
                arranges.forEach((arrange, index) => {
                  arrange.populate({path: 'movie'}, (popErr, popDoc) => {
                    arrange = popDoc
                    if (index === arranges.length - 1) {
                      resolve({status: 1, data: arranges})
                    }
                  })
                })
              } else {
                resolve({status: 1, data: arranges})
              }
            }
          })
      })
    }
  }
}

const deleteArrange = {
  method: 'POST',
  path: '/arrange/delete/{arrange_id}',
  options: {
    validate: {
      params: {
        arrange_id: Joi.number().integer().min(1).required()
      }
    },
    handler: (req, reply) => {
      const { arrange_id } = req.body

      return new Promise((resolve, reject) => {
        arrangeModel.remove({_id: arrange_id}, (err, result) => {
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

module.exports = [addArragne, getArranges, deleteArrange]
