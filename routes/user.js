const Boom = require('boom')
const Joi = require('joi')
const userModel = require('../schemas/user')

const addUser = {
  method: 'POST',
  path: '/user/add',
  options: {
    validate: {
      payload: {
        username: Joi.string().min(1).required(),
        password: Joi.string().min(6).max(15).required(),
        phone: Joi.string().regex(/^1\d{10}$/).required(),
        role: Joi.string().regex(/^(admin|normal)$/)
      }
    },
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        new userModel(req.payload).save((err, result) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            delete result._doc.password
            resolve({ status: 1, data: result._doc})
          }
        })
      })
    }
  }
}

const userLogin = {
  method: 'POST',
  path: '/user/login',
  options: {
    validate: {
      payload: {
        username: Joi.string().min(1).required(),
        password: Joi.string().min(6).max(15).required()
      }
    },
    handler: (req, res) => {
      const { username, password } = req.payload

      return new Promise((resolve, reject) => {
        userModel.find({username: username}, (err, result) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            if (result.length) {
              for (let i = 0, userLen = result.length; i < userLen; i++) {
                if (result[i].password === password) {
                  delete result[i]._doc.password
                  resolve({status: 1, data: result[i]._doc})
                  return
                }
              }
              resolve(Boom.badRequest('密码不正确'))
            } else {
              resolve(Boom.badRequest('用户名不存在'))
            }
          }
        })
      })
    }
  }
}

const getUserList = {
  method: 'GET',
  path: '/user/list',
  options: {
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        userModel.find((err, users) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            users.forEach(user => {
              delete user._doc.password
            })
            resolve({status: 1, data: users})
          }
        })
      })
    }
  }
}

const updatePassword = {
  method: 'POST',
  path: '/user/updatePassword',
  options: {
    validate: {
      payload: {
        user_id: Joi.number().integer().min(1).required(),
        oldPassword: Joi.string().min(6).max(15).required(),
        newPassword: Joi.string().min(6).max(15).required()
      }
    },
    handler: (req, reply) => {
      const { user_id, oldPassword, newPassword } = req.payload
      let searchInfo = {
        user_id: user_id,
        password: oldPassword
      }
      if (oldPassword === newPassword) {
        return (Boom.badRequest('新旧密码不能相同'))
      } else {
        return new Promise((resolve, reject) => {
          userModel.findOneAndUpdate(searchInfo, {$set: {password: newPassword}}, (err, user) => {
            if (err) {
              reject(Boom.badImplementation(err.message))
            } else {
              user ? resolve({status: 1, message: '修改密码成功，请重新登录'}) : reject(Boom.badRequest('旧密码不正确'))
            }
          })
        })
      }
    }
  }
}

const updateUserInfo = {
  path: '/user/update',
  method: 'POST',
  options: {
    validate: {
      payload: {
        _id: Joi.number().integer().min(1).required(),
        username: Joi.string().min(1).required(),
        phone: Joi.string().regex(/^1\d{10}$/).required(),
        role: Joi.string().regex(/^(admin|normal)$/).required()
      }
    },
    handler: (req, reply) => {
      const { _id } = req.payload

      delete req.payload._id
      return new Promise((resolve, reject) => {
        userModel.findOneAndUpdate({_id: _id}, {$set: req.payload}, {new: true}, (err, user) => {
          if (err) {
            reject(Boom.badImplementation(err.message))
          } else {
            user ? resolve({status: 1, data: user}) : resovle({status: 0, data: user})
          }
        })
      })
    }
  }
}

const deleteUser = {
  method: 'POST',
  path: '/user/delete/{userId}',
  options: {
    validate: {
      params: {
        userId: Joi.number().integer().min(1).required()
      }
    },
    handler: (req, reply) => {
      return new Promise((resolve, reject) => {
        userModel.findOneAndRemove({_id: req.params.userId}, (err, user) => {
          if (err) {

          } else {
            user ? resolve({status: 1, data: null, message: '删除用户成功'}) : resolve({status: 0, data: null, message: '删除用户失败'})
          }
        })
      })
    }
  }
}

module.exports = [addUser, userLogin, getUserList, updatePassword, updateUserInfo, deleteUser]
