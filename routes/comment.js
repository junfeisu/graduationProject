const Boom = require('boom')
const Joi = require('joi')
const commentModel = require('../schemas/comment')

const getComments = {
  path: '/comment/movie/{movieId}',
  method: 'GET',
  options: {
    validate: {
      params: {
        movieId: Joi.number().integer().min(1).required()
      }
    },
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        commentModel.find({movie: req.params.movieId})
          .populate('comment_user')
          .exec((err, comments) => {
            if (err) {
              reject(Boom.badImplementation(err.message))
            } else {
              resolve({status: 1, data: comments})
            }
          })
      })
    }
  }
}

const addComment = {
  path: '/comment/add',
  method: 'POST',
  options: {
    validate: {
      payload: {
        comment_user: Joi.number().integer().min(1).required(),
        movie: Joi.number().integer().min(1).required(),
        content: Joi.string().min(1).required()
      }
    },
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        new commentModel(req.payload).save((err, comment) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            resolve({status: 1, data: comment})
          }
        })
      })
    }
  }
}

const deleteComment = {
  path: '/comment/delete/{commentId}',
  method: 'POST',
  options: {
    validate: {
      params: {
        commentId: Joi.number().integer().min(1).required()
      }
    },
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        commentModel.findOneAndRemove({_id: req.params.commentId}, (err, comment) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            comment ? resolve({status: 1, data: null}) : resolve({status: 0, data: null})
          }
        })
      })
    }
  }
}

module.exports = [
  getComments,
  addComment,
  deleteComment
]
