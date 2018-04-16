const express = require('express')
const route = express.Router()
const arrangeModel = require('../schemas/arrange')

// 添加电影播放安排
route.post('/add', (req, res) => {
  new arrangeModel(req.body).save(function (err, arrange) {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json(arrange)
    }
  })
})

// 删除电影播放安排
route.post('/delete', (req, res) => {
  const { arrange_id } = req.body
  if (arrange_id) {
    arrangeModel.remove({arrange_id: arrange_id}, function(err, result) {
      if (err) {
        res.status(500).json(err)
      } else {
        result.result.n ? res.json({status: 'OK', message: '删除成功'}) : res.json({status: 'Fail', message: '删除失败'})
      }
    })
  } else {
    res.status(400).json({
      status: 'Fail',
      message: 'arrange_id is necessary'
    })
  }
})

module.exports = route
