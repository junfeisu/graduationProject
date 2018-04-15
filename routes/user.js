const express = require('express')
const route = express.Router()
const userModel = require('../schemas/user')
const Validate = require('../models/validate')

// register
route.post('/add', (req, res) => {
  const { username, password, phone } = req.body
  if (username && password && phone) {
    new userModel(req.body).save((err, user) => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.json(user)
      }
    })
  } else {
    res.status(400).json({
      status: 'Fail',
      message: '用户名，密码，手机号不能为空'
    })    
  }
})

// login
route.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    userModel.findOne({username: username}, function (err, user) {
      if (err) {
        res.status(500).json(err)
      } else {
        if (user) {
          user.password === password ? 
            res.json({
              status: 'OK',
              message: '登录成功'
            }) :
            res.status(400).json({
              status: 'Fail',
              password: '密码不正确'
            })
        } else {
          res.status(400).json({
            status: 'Fail',
            message: '账号不存在'
          })
        }
      }
    })
  } else {
    res.status(400).json({
      status: 'Fail',
      message: '用户名和密码不能为空'
    })
  }
})

// update info
route.post('/update', (req, res) => {
  if (req.body.user_id) {
    userModel.findOneAndUpdate({user_id: req.body.user_id}, {$set: req.body.userInfo}, function (err, user) {
      if (err) {
        res.status(500).json(err)
      } else {
        user ? res.json({status: 'OK', message: '修改信息成功'}) : res.json({status: 'Fail', message: '用户不存在'})
      }
    })
  } else {
    res.status(400).json({
      status: 'Fail',
      message: 'user_id can not be null'
    })
  }
})

module.exports = route
