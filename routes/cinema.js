const Boom = require('boom')
const Joi = require('joi')
const cinemaModel = require('../schemas/cinema')

// 添加电影院
const addCinema = {
  method: 'POST',
  path: '/cinema/add',
  options: {
    validate: {
      payload: {
        address: Joi.string().min(1).required(),
        contact: Joi.string().required(),
        screeningRooms: Joi.array().required()
      }
    },
    handler: (req, reply) => {
      console.log('add cinema')
      return new Promise((resolve, reject) => {
        new cinemaModel(req.payload).save((err, cinema) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            resolve({status: 1, data: cinema})
          }
        })
      })
    }
  }
}

// 修改电影院信息
const upadteCinema = {
  method: 'POST',
  path: '/cinema/update/{cinema_id}',
  options: {
    validate: {
      params: {
        cinema_id: Joi.number().integer().min(1).required()
      },
      payload: {
        address: Joi.string().min(1),
        contcat: Joi.string(),
        screeningRooms: Joi.array()
      }
    },
    handler: (req, reply) => {
      const { cinema_id, cinemaInfo } = req.body
      return new Promise((resolve, reject) => {
        cinemaModel.findOneAndUpdate({_id: cinema_id}, {$set: cinemaInfo}, {new: true}, (err, cinema) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            cinema ? resolve({status: 1, messgae: '修改信息成功', data: cinema}) : resolve({status: 0, message: '修改信息失败', data: null})
          }
        })
      })
    }
  }
}

// 删除电影院
const deleteCinema = {
  method: 'POST',
  path: '/cinema/delete/{cinema_id}',
  options: {
    validate: {
      params: {
        cinema_id: Joi.number().integer().min(1).required()
      }
    },
    handler: (req, reply) => {
      const { cinema_id } = req.params
      return new Promise((resolve, reject) => {
        cinemaModel.findOneAndRemove({_id: cinema_id}, (err, result) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            result ? resolve({status: 1, message: '删除成功'}) : resolve({status: 0, message: '删除失败'})
          }
        })
      })
    }
  }
}

module.exports = [addCinema, upadteCinema, deleteCinema]
