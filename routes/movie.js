const Boom = require('boom')
const Joi = require('joi')
const movieModel = require('../schemas/movie')
const superagent = require('superagent')
const requestHeader = require('../models/header')

// 获取正在上映的电影
const getPlayingMovies = {
  method: 'GET',
  path: '/movie/playing',
  options: {
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        movieModel.aggregate([{$match: {}}, {$limit: 4}], (err, playingMovies) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            resolve({status: 1, data: playingMovies})
          }
        })
      })
    }
  }
}

// 获取即将上映的电影
const getWillplayMovies = {
  method: 'GET',
  path: '/movie/come_soon',
  options: {
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        superagent.options('https://api.douban.com/v2/movie/coming_soon')
          .end((err, result) => {
            if (err) {
              reject(Boom.badImplementation(err.message))
            } else {
              if (result.body.count) {
                resolve({status: 1, data: result.body.subjects.slice(0, 4)})
              } else {
                resolve({status: 1, data: []})
              }
            }
          })
      })
    }
  }
}

const getMovieList = {
  method: 'POST',
  path: '/movie/list',
  options: {
    validate: {
      payload: {
        pageNum: Joi.number().integer().required()
      }
    },
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        const { pageNum } = req.payload
        const result = {movies: [], total: 0}
        const message = [
          {$match: {}},
          {$skip: 10 * (pageNum - 1)},
          {$limit: 10}
        ]

        movieModel.aggregate(message, (err, movies) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            result.movies = movies
            movieModel.find({}, (err, allMovies) => {
              result.total = allMovies.length
              resolve(result)
            })
          }
        })
      })
    }
  }
}

// 添加电影
const addMovie = {
  method: 'POST',
  path: '/movie/add',
  options: {
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        new movieModel(req.payload).save((err, movie) => {
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

// 获取单个电影
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

// 获取排名前十
const getTopTenMovies = {
  method: 'GET',
  path: '/movie/top',
  options: {
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        superagent.options('https://api.douban.com/v2/movie/top250')
          .end((err, result) => {
            if (err) {
              reject(Boom.badImplementation(err.message))
            } else {
              resolve({status: 1, data: result.body.subjects.slice(0, 10)})
            }
          })
      })
    }
  }
}

// 获取每周口碑最好的电影
// const getPrasiedMovies = {
//   method: 'GET',
//   path: '/movie/praised',
//   options: {
//     handler: (req, reply) => {
//       return new Promise((resolve, reject) => {
//         superagent.get('https://api.douban.com/v2/movie/weekly')
//           .set(requestHeader)
//           .end((err, result) => {
//             if (err) {
//               console.log(err)
//               reject(Boom.badImplementation(err.message))
//             } else {
//               console.log(result.body)
//               // resolve({status: 1, data: result.body.})
//             }
//           })
//       })
//     }
//   }
// }

// 修改电影信息
const updateMovie = {
  method: 'POST',
  path: '/movie/update',
  options: {
    handler: (req, reply) => {
      const { _id } = req.payload
      delete req.payload._id
      return new Promise((resolve, reject) => {
        movieModel.findOneAndUpdate({_id: _id}, {$set: req.payload}, {new: true}, (err, movie) => {
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
        movieModel.findOneAndRemove({_id: req.payload.movie_id}, (err, result) => {
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

module.exports = [
  addMovie,
  getPlayingMovies,
  getWillplayMovies,
  getMovieList,
  getTopTenMovies,
  getMovie,
  updateMovie,
  deleteMovie
]
