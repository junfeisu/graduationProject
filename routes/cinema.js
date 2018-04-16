const express = require('express')
const route = express.Router()
const cinemaModel = require('../schemas/cinema')

// 添加电影院
route.post('/add', (req, res) => {
  new cinemaModel(req.body).save((err, cinema) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json(cinema)
    }
  })
})

// 修改电影院信息
route.post('/update', (req, res) => {
  const { cinema_id, cinemaInfo } = req.body
  if (cinema_id) {
    cinemaModel.findOneAndUpdate({cinema_id: cinema_id}, {$set: cinemaInfo}, {new: true}, function (err, cinema) {
      if (err) {
        res.status(500).json(err)
      } else {
        cinema ? res.status(400).json({status: 'Fail', message: '修改信息失败'}) : res.json({status: 'OK', messgae: '修改信息成功', data: cinema})
      }
    })
  } else {
    res.status(400).json({
      status: 
    })
  }
})

// 删除电影院
route.post('/delete', (req, res) => {
  const { cinema_id } = req.body
  if (cinema_id) {
    cinemaModel.remove({cinema_id: cinema_id}, function (err, result) {
      if (err) {
        res.status(500).json(err)
      } else {
        result.result.n ? res.json({status: 'OK', message: '删除成功'}) : res.json({status: 'Fail', message: '删除失败'})
      }
    })
  } else {
    res.status(400).json({
      staus: 'Fail',
      message: 'cinema_is is necessary'
    })
  }
})

module.exports = route
