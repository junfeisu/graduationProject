const Boom = require('boom')
const Joi = require('joi')
const movieModel = require('../schemas/movie')

// 添加电影
const addMovie = {
  method: 'POST',
  path: '/movie/add',
  options: {
    validate: {
      payload: {
        name: Joi.string().min(1).required(),
        duration: Joi.string().min(1).required(),
        types: Joi.array().required(),
        starring: Joi.array().required(),
        director: Joi.array().required(),
        desc: Joi.string().min(10),
        area: Joi.string()
      }
    },
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        new movieModel(req.body).save((err, movie) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            resolve({status: 1, data: movie})
          }
        })
      })
    }
  }
}

const getMovie = {
  method: 'GET',
  path: '/movie/{movieId}',
  options: {
    validate: {
      params: {
        movieId: Joi.number().integer().min(1).required()
      }
    },
    handler: (req, h) => {
      return new Promise((resolve, reject) => {
        movieModel.findOne({_id: req.params.movieId}, (err, movie) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            resolve({status: 1, data: movie})
          }
        })
      })
    }
  }
}

// 修改电影信息
const updateMovie = {
  method: 'POST',
  path: '/movie/update',
  options: {
    validate: {
      payload: {
        movie_id: Joi.number().integer().min(1).required()
      }
    },
    handler: (req, reply) => {
      const { movie_id, movieInfo } = req.payload
      return new Promise((resolve, reject) => {
        movieModel.findOneAndUpdate({movie_id: movie_id}, {$set: movieInfo}, {new: true}, (err, movie) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            movie ? resolve({status: 1, message: '修改成功', data: movie}) : resolve({status: 0, message: '电影不存在', data: null})
          }
        })
      })
    }
  }
}

// 删除电影
const deleteMovie = {
  method: 'POST',
  path: '/movie/delete',
  options: {
    validate: {
      payload: {
        movie_id: Joi.number().integer().min(1).required()
      }
    },
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        movieModel.remove({movie_id: req.payload.movie_id}, (err, result) => {
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

module.exports = [addMovie, getMovie, updateMovie, deleteMovie]
