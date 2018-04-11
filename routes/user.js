const express = require('express')
const route = express.Router()
const userModel = require('../schemas/user')
const Validate = require('../models/validate')

// register
route.post('/add', (req, res) => {
  for (var key in req.body) {
    if (Validate('username', )) {}
  }

  if (validateResult && !validateResult.valid) {
    res.status(400).json(validateResult)
    return
  }

  new userModel(req.body).save((err, user) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json(user)
    }
  })
})

// login
// route.post('/login', (req, res) => {
//   if (req.body.username && req.body.password) {
    
//   }
// })

module.exports = route
