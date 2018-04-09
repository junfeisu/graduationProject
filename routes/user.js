const express = require('express')
const route = express.Router()
const userModel = require('../schemas/user')

route.post('/add', (req, res) => {
  new userModel(req.body).save((err, user) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json(user)
    }
  })
})

module.exports = route
