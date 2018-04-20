const Boom = require('boom')
const Joi = require('joi')
const cinemaModel = require('../schemas/cinema')

// 添加电影院
const addCinema = {
  method: 'POST',
  path: '/cinema/add',
  config: {
    validate: {
      payload: {
        address: Joi.string().min(1).required(),
        contcat: Joi.string().required(),
        screeningRooms: Joi.array().required()
      }
    }
  },
  handler: (req, reply) => {
    new cinemaModel(req.body).save((err, cinema) => {
      if (err) {
        reply(Boom.badImplementation(err.message))
      } else {
        reply({status: 1, data: cinema})
      }
    })
  }
}

// 修改电影院信息
const upadteCinema = {
  method: 'POST',
  path: '/cinema/update/{cinema_id}',
  config: {
    validate: {
      params: {
        cinema_id: Joi.number().integer().min(1).required()
      },
      payload: {
        address: Joi.string().min(1),
        contcat: Joi.string(),
        screeningRooms: Joi.array()
      }
    }
  },
  handler: (req, reply) => {
    const { cinema_id, cinemaInfo } = req.body
    cinemaModel.findOneAndUpdate({cinema_id: cinema_id}, {$set: cinemaInfo}, {new: true}, (err, cinema) => {
      if (err) {
        reply(Boom.badImplementation(err.message))
      } else {
        cinema ? reply({status: 0, message: '修改信息失败', data: null}) : reply({status: 1, messgae: '修改信息成功', data: cinema})
      }
    })
  }
}

// 删除电影院
const deleteCinema = {
  method: 'POST',
  path: '/cinema/delete/{cinema_id}',
  config: {
    validate: {
      params: {
        cinema_id: Joi.number().integer().min(1).required()
      }
    }
  },
  handler: (req, reply) => {
    const { cinema_id } = req.params
    cinemaModel.remove({cinema_id: cinema_id}, (err, result) => {
      if (err) {
        reply(Boom.badImplementation(err.message))
      } else {
        result.result.n ? reply({status: 1, message: '删除成功'}) : reply({status: 0, message: '删除失败'})
      }
    })
  }
}

module.exports = [addCinema, upadteCinema, deleteCinema]
