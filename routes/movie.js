const Boom = require('boom')
const Joi = require('joi')
const movieModel = require('../schemas/movie')

// 添加电影
const addMovie = {
  method: 'POST',
  path: '/movie/add',
  config: {
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
    }
  },
  handler: (req, reply) => {
    new movieModel(req.body).save((err, movie) => {
      if (err) {
        reply(Boom.badImplementation(err.message))
      } else {
        reply({status: 1, data: movie})
      }
    })
  }
}

// 修改电影信息
const updateMovie = {
  method: 'POST',
  path: '/movie/update',
  config: {
    validate: {
      payload: {
        movie_id: Joi.number().integer().min(1).required()
      }
    }
  },
  handler: (req, reply) => {
    const { movie_id, movieInfo } = req.payload
    movieModel.findOneAndUpdate({movie_id: movie_id}, {$set: movieInfo}, {new: true}, (err, movie) => {
      if (err) {
        res.status(500).json(err)
      } else {
        movie ? reply({status: 1, message: '修改成功', data: movie}) : reply({status: 0, message: '电影不存在', data: null})
      }
    })
  }
}

// 删除电影
const deleteMovie = {
  method: 'POST',
  path: '/movie/delete',
  config: {
    validate: {
      payload: {
        movie_id: Joi.number().integer().min(1).required()
      }
    }
  },
  handler: (req, reply) => {
    movieModel.remove({movie_id: req.payload.movie_id}, (err, result) => {
      if (err) {
        reply(Boom.badImplementation(err.message))
      } else {
        result.result.n ? reply({status: 1, message: '删除成功'}) : reply({status: 0, message: '删除失败'})
      }
    })
  }
}

module.exports = [addMovie, updateMovie, deleteMovie]
