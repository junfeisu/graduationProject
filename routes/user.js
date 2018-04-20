const Boom = require('boom')
const Joi = require('joi')
const userModel = require('../schemas/user')

const addUser = {
  method: 'POST',
  path: '/user/add',
  config: {
    validate: {
      payload: {
        username: Joi.string().min(1).required(),
        password: Joi.string().min(6).max(15).required(),
        phone: Joi.string().regex(/^1\d{10}$/).required()
      }
    }
  },
  handler: (req, reply) => {
    new userModel(req.body).save((err, user) => {
      if (err) {
        reply(Boom.badImplementation(err.message))
      } else {
        delete result._doc.password
        delete result._doc._id
        reply({
          status: 1,
          data: result._doc
        })
      }
    })
  }
}

const userLogin = {
  method: 'POST',
  path: '/user/login',
  config: {
    validate: {
      payload: {
        username: Joi.string().min(1).required(),
        password: Joi.string().min(6).max(15).required()
      }
    }
  },
  handler: (req, res) => {
    const { username, password } = req.payload

    userModel.find({username: username}, (err, result) => {
      if (err) {
        reply(Boom.badImplementation(err.message))
      } else {
        if (result.length) {
          for (let i = 0, userLen = result.length; i < userLen; i++) {
            if (result[i].password === password) {
              delete result[i]._doc.password
              delete result[i]._doc._id
              reply({status: 0, data: result[i]._doc})
              return
            }
          }
          reply(Boom.badRequest('密码不正确'))
        } else {
          reply(Boom.badRequest('用户名不存在'))
        }
      }
    })
  }
}

const updatePassword = {
  method: 'POST',
  path: '/user/updatePassword',
  config: {
    validate: {
      payload: {
        user_id: Joi.number().integer().min(1).required(),
        oldPassword: Joi.string().min(6).max(15).required(),
        newPassword: Joi.string().min(6).max(15).required()
      }
    }
  },
  handler: (req, reply) => {
    const { user_id, oldPassword, newPassword } = req.payload
    let searchInfo = {
      user_id: user_id,
      password: oldPassword
    }
    if (oldPassword === newPassword) {
      reply(Boom.badRequest('新旧密码不能相同'))
    } else {
      userModel.findOneAndUpdate(searchInfo, {$set: {password: newPassword}}, (err, user) => {
        if (err) {
          reply(Boom.badImplementation(err.message))
        } else {
          user ? reply({status: 1, message: '修改密码成功，请重新登录'}) : reply(Boom.badRequest('旧密码不正确'))
        }
      })
    }
  }
}

module.exports = [addUser, userLogin, updatePassword]
